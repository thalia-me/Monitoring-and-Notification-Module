<?php

namespace App\Http\Controllers;

use App\Models\AdviserAcceptanceRequest;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function stats(Request $request)
    {
        $user = $request->user();
        $query = AdviserAcceptanceRequest::query();

        // Filter based on user role
        if ($user->role === 'student_researcher') {
            $query->where('student_id', $user->id);
        } elseif ($user->role === 'adviser') {
            $query->where('adviser_email', $user->email);
        }

        $stats = [
            'total_requests' => $query->count(),
            'pending' => (clone $query)->where('status', 'pending')->count(),
            'approved' => (clone $query)->where('status', 'approved')->count(),
            'rejected' => (clone $query)->where('status', 'rejected')->count(),
            'unread_notifications' => $user->unreadNotificationsCount(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Get recent adviser acceptance requests.
     */
    public function recentRequests(Request $request)
    {
        $user = $request->user();
        $query = AdviserAcceptanceRequest::with(['student', 'statusUpdatedBy']);

        // Filter based on user role
        if ($user->role === 'student_researcher') {
            $query->where('student_id', $user->id);
        } elseif ($user->role === 'adviser') {
            $query->where('adviser_email', $user->email);
        }

        $recentRequests = $query->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $recentRequests,
        ]);
    }
}
