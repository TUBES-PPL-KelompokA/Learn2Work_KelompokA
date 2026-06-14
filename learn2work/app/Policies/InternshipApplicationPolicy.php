<?php

namespace App\Policies;

use App\Models\InternshipApplication;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InternshipApplicationPolicy
{
    use HandlesAuthorization;

    public function view(User $user, InternshipApplication $application)
    {
        return $user->id === $application->user_id || $user->role === 'admin';
    }

    public function update(User $user, InternshipApplication $application)
    {
        return $user->id === $application->user_id;
    }

    public function delete(User $user, InternshipApplication $application)
    {
        return $user->id === $application->user_id || $user->role === 'admin';
    }
}
