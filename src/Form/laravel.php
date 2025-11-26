<?php // database/migrations/2025_01_01_000000_create_users_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); // required
            $table->string('last_name');  // required
            $table->date('dob');           // required
            $table->string('phone')->unique(); // required + unique
            $table->string('phone_country_code'); // required
            $table->string('location_country_code'); // required
            $table->string('location'); // required
            $table->string('email')->unique(); // required + unique
            $table->enum('gender', ['male','female','other']); // required
            $table->string('password'); // required
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('users');
    }
};



// database/migrations/2025_01_01_000001_create_otp_verifications_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('otp_verifications', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('otp'); // store hashed or plain? we'll store plain with expiry as short-lived
            $table->timestamp('expires_at');
            $table->boolean('verified')->default(false);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('otp_verifications');
    }
};



use App\Http\Controllers\Auth\RegisterController;

Route::post('/send-otp', [RegisterController::class, 'sendOtp']);
Route::post('/verify-otp', [RegisterController::class, 'verifyOtp']);
Route::post('/register', [RegisterController::class, 'register']);





namespace App\Http\Controllers\Auth;
 use App\Http\Controllers\Controller; 
 use Illuminate\Http\Request; 
 use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail; 
use App\Models\User; 
use App\Models\OtpVerification; 
use Carbon\Carbon; 
use Illuminate\Support\Facades\Hash; 
use App\Mail\OtpMail; 

class RegisterController extends Controller { 
    public function sendOtp(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
    ]);
    if ($validator->fails()) {
        return response()->json(['errors'=>$validator->errors()], 422);
    }

    $email = $request->email;

    // generate 6-digit numeric OTP
    $otp = rand(100000, 999999);

    // expiry 10 minutes from now
    $expires = Carbon::now()->addMinutes(10);

    // delete previous OTPs
    OtpVerification::where('email', $email)->delete();

    // store hashed OTP
    OtpVerification::create([
        'email' => $email,
        'otp' => Hash::make($otp),   // 🔥 OTP HASHED HERE
        'expires_at' => $expires,
        'verified' => false,
    ]);

    // send email with REAL OTP (visible to user, hash stored)
    Mail::to($email)->send(new OtpMail($otp));

    return response()->json([
        'message' => 'OTP sent to email.',
        'expires_at' => $expires,
    ]);
}

public function verifyOtp(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'otp' => 'required'
    ]);
    if ($validator->fails()) {
        return response()->json(['errors'=>$validator->errors()], 422);
    }

    $email = $request->email;
    $otp = $request->otp;

    $record = OtpVerification::where('email', $email)
                ->orderBy('created_at', 'desc')
                ->first();

    if (!$record) {
        return response()->json(['message'=>'No OTP requested for this email.'], 404);
    }

    if ($record->verified) {
        return response()->json(['message'=>'OTP already verified.'], 400);
    }

    if (Carbon::now()->greaterThan($record->expires_at)) {
        return response()->json(['message'=>'OTP expired.'], 400);
    }

    // 🔥 check OTP against hash
    if (!Hash::check($otp, $record->otp)) {
        return response()->json(['message'=>'Invalid OTP.'], 400);
    }

    $record->verified = true;
    $record->save();

    return response()->json(['message'=>'OTP verified.']);
}


public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'dob'        => 'nullable|date',
            'phone'      => 'nullable|string',
            'phone_country_code' => 'nullable|string',
            'location'   => 'nullable|string',
            'location_country_code' => 'nullable|string',
            'email'      => 'required|email|unique:users,email',
            'gender'     => 'nullable|in:male,female,other',
            'password'   => 'required|string|min:8|confirmed', // password_confirmation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors'=>$validator->errors()], 422);
        }

        // Check OTP verified
        $email = $request->email;
        $otpRecord = OtpVerification::where('email', $email)
                     ->orderBy('created_at', 'desc')
                     ->first();

        if (!$otpRecord || !$otpRecord->verified) {
            return response()->json(['message' => 'Email not verified by OTP.'], 400);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'dob'        => $request->dob,
            'phone'      => $request->phone,
            'phone_country_code' => $request->phone_country_code,
            'location'   => $request->location,
            'location_country_code' => $request->location_country_code,
            'email'      => $request->email,
            'gender'     => $request->gender,
            'password'   => Hash::make($request->password),
            'email_verified_at' => now(),
        ]);

        // optionally delete OTP record
        $otpRecord->delete();

        return response()->json(['message' => 'Registration complete', 'user' => $user], 201);
    }
    
}

app/Models/OtpVerification.php:
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtpVerification extends Model
{
    use HasFactory;
    protected $fillable = ['email','otp','expires_at','verified'];
    protected $dates = ['expires_at'];
}



app/Mail/OtpMail.php:
<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;
    public $otp;

    public function __construct($otp) {
        $this->otp = $otp;
    }

    public function build() {
        return $this->subject('Your verification code')
                    ->view('emails.otp')
                    ->with(['otp' => $this->otp]);
    }
}


resources/views/emails/otp.blade.php:
<!doctype html>
<html>
  <body>
    <p>Your verification code is: <strong>{{ $otp }}</strong></p>
    <p>This code expires in 10 minutes.</p>
  </body>
</html>




//login
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // ----------------------------
    // 1️⃣ SEND LOGIN OTP
    // ----------------------------
    public function sendLoginOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        $otp = rand(100000, 999999);

        // Save OTP in temporary table
        DB::table('email_otps')->updateOrInsert(
            ['email' => $request->email],
            ['otp' => $otp, 'created_at' => now()]
        );

        // Send email
        Mail::raw("Your login OTP code is: $otp", function ($message) use ($request) {
            $message->to($request->email)->subject('Your Login OTP Code');
        });

        return response()->json(['message' => 'OTP sent']);
    }

    // ----------------------------
    // 2️⃣ VERIFY LOGIN OTP
    // ----------------------------
    public function verifyLoginOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required'
        ]);

        $record = DB::table('email_otps')
            ->where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid OTP'], 422);
        }

        return response()->json(['verified' => true]);
    }

    // ----------------------------
    // 3️⃣ FINAL LOGIN (AFTER OTP IS VERIFIED)
    // ----------------------------
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login'], 401);
        }

        $token = Auth::user()->createToken('login_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => Auth::user()
        ]);
    }
}


create step by step and add animation 
we have a practical task.

Step 1: Graphic Design (Prepare the Banner)

    I have attached 2 photos: (1) PTFE Compression Moulding Machine & (2) PTFE Products.

    Create a professional Website Banner combining these images.

    You can remove the background if required.

    Tool: Use Canva or any tool you prefer.

Step 2: Content Writing (Prepare the Content)

    Topic: "Why is PTFE an Essential Plastic for the Aerospace Industry?"

    Write a 300-400 word blog post covering:

        3 to 5 Catchy Headlines.

        3 SEO-friendly Keywords.

        2 Backlinks (Link to any relevant source).

Step 3: WordPress Implementation (Final Execution)

    Combine Step 1 & Step 2 on a live site.

    Go to tastewp.com (It creates a free temporary WordPress site instantly, valid for 2 days).

    Create a New Post.

    Upload the Banner (from Step 1) as the Featured Image or at the top.

    Paste the Blog Content (from Step 2) with proper formatting (H1, H2 tags).

    Publish the post.

🌟 Important Note: The instructions above are the minimum requirement. Feel free to use your own creativity to add anything extra (like a Meta Description, better formatting, extra images, or any) if you think it makes the post better.
