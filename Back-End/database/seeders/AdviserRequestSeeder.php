<?php

namespace Database\Seeders;

use App\Models\AdviserAcceptanceRequest;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdviserRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::where('role', 'student_researcher')->get();
        $adviser = User::where('role', 'adviser')->first();

        if ($students->isEmpty() || !$adviser) {
            return;
        }

        // Create sample requests with different statuses
        AdviserAcceptanceRequest::create([
            'student_id' => $students[0]->id,
            'research_title' => 'Machine Learning Applications in Healthcare Diagnostics',
            'research_objectives' => '1. To evaluate ML models for diagnosis.\n2. To build a robust dashboard UI.\n3. To validate results against medical standards.',
            'research_area' => 'Artificial Intelligence',
            'group_members' => 'Alice Smith, Bob Johnson',
            'adviser_name' => $adviser->first_name . ' ' . $adviser->last_name,
            'adviser_email' => $adviser->email,
            'expected_defense_date' => '2026-12-15',
            'document_url' => 'https://drive.google.com/file/d/1DiagExampleUNCHealthcareML/view',
            'status' => 'pending',
        ]);

        if ($students->count() > 1) {
            AdviserAcceptanceRequest::create([
                'student_id' => $students[1]->id,
                'research_title' => 'Blockchain Technology for Secure Academic Records Management',
                'research_objectives' => '1. Design blockchain architecture for UNC.\n2. Implement smart contracts for grade storage.\n3. Test throughput and security features.',
                'research_area' => 'Blockchain & Security',
                'group_members' => 'Charlie Brown, Diana Prince',
                'adviser_name' => $adviser->first_name . ' ' . $adviser->last_name,
                'adviser_email' => $adviser->email,
                'expected_defense_date' => '2026-11-20',
                'document_url' => 'https://drive.google.com/file/d/1BlockExampleUNCRecordsManagement/view',
                'status' => 'approved',
                'status_updated_at' => now()->subDays(5),
                'status_updated_by' => $adviser->id,
            ]);
        }

        if ($students->count() > 2) {
            $secondAdviser = User::where('role', 'adviser')->skip(1)->first() ?? $adviser;

            AdviserAcceptanceRequest::create([
                'student_id' => $students[2]->id,
                'research_title' => 'IoT-Based Smart Campus Monitoring System',
                'research_objectives' => '1. Set up sensor grid across engineering building.\n2. Collect real-time environmental data.\n3. Implement automated notifications for threshold breaches.',
                'research_area' => 'Internet of Things',
                'group_members' => 'Evan Wright, Fiona Gallagher',
                'adviser_name' => $secondAdviser->first_name . ' ' . $secondAdviser->last_name,
                'adviser_email' => $secondAdviser->email,
                'expected_defense_date' => '2026-04-10',
                'document_url' => 'https://drive.google.com/file/d/1IoTExampleUNCSmartCampusMonitor/view',
                'status' => 'rejected',
                'status_updated_at' => now()->subDays(10),
                'status_updated_by' => $secondAdviser->id,
                'rejection_reason' => 'The proposed scope is too broad for the given timeline. Please narrow down the focus to specific aspects of campus monitoring.',
            ]);
        }
    }
}
