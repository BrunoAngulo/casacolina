<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $invitationLink;

    public function __construct($invitationLink)
    {
        $this->invitationLink = $invitationLink;
    }

    public function build()
    {
        return $this->view('emails.admin_invitation')
                    ->with('invitationLink', $this->invitationLink);
    }
}