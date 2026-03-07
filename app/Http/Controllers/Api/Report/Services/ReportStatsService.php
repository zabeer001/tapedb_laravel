<?php

namespace App\Http\Controllers\Api\Report\Services;

use App\Models\Tape;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class ReportStatsService
{
    /**
     * Build the reports dashboard payload.
     *
     * @return array<string, mixed>
     */
    public function handle(): array
    {
        $editorRoles = ['admin', 'editor', 'superadmin'];

        $totalEntries = Tape::query()->count();
        $qaChecked = Tape::query()->where('qa_checked', 1)->count();

        $rows = User::query()
            ->select(['users.id', 'users.name', 'users.email', 'users.role', 'users.avatar_path'])
            ->selectRaw('COALESCE(SUM(CASE WHEN tapes.id IS NULL THEN 0 WHEN tapes.qa_checked = 1 THEN 1 ELSE 0 END), 0) AS qa_checked_count')
            ->selectRaw('COALESCE(SUM(CASE WHEN tapes.id IS NULL THEN 0 WHEN tapes.qa_checked = 1 THEN 0 ELSE 1 END), 0) AS not_qa_count')
            ->selectRaw('COUNT(tapes.id) AS total_count')
            ->leftJoin('tapes', 'tapes.user_id', '=', 'users.id')
            ->whereIn('users.role', $editorRoles)
            ->groupBy('users.id', 'users.name', 'users.email', 'users.role')
            ->orderByDesc('total_count')
            ->orderBy('users.name')
            ->get();

        $mappedRows = $this->mapRows($rows);
        $graphContributors = collect($mappedRows)
            ->take(10)
            ->sortBy('total')
            ->values()
            ->all();

        return [
            'summary' => [
                'total_entries' => $totalEntries,
                'unique_titles' => Tape::query()
                    ->whereNotNull('title')
                    ->where('title', '!=', '')
                    ->distinct('title')
                    ->count('title'),
                'qa_checked' => $qaChecked,
                'not_qa_checked' => $totalEntries - $qaChecked,
                'editors_admins' => User::query()->whereIn('role', $editorRoles)->count(),
            ],
            'editor_stats' => $mappedRows,
            'graph_contributors' => $graphContributors,
            'top_contributors' => array_slice($mappedRows, 0, 5),
        ];
    }

    /**
     * @param Collection<int, object> $rows
     * @return array<int, array<string, int|string>>
     */
    private function mapRows(Collection $rows): array
    {
        return $rows
            ->map(fn ($row) => [
                'id' => (int) $row->id,
                'name' => (string) $row->name,
                'email' => (string) $row->email,
                'role' => $this->roleLabel((string) $row->role),
                'avatar_url' => $row->avatar_path ? Storage::disk('public')->url((string) $row->avatar_path) : null,
                'qa_checked' => (int) $row->qa_checked_count,
                'not_qa' => (int) $row->not_qa_count,
                'total' => (int) $row->total_count,
            ])
            ->values()
            ->all();
    }

    private function roleLabel(string $role): string
    {
        return match ($role) {
            'superadmin' => 'Super Admin',
            'admin' => 'Administrator',
            'editor' => 'Editor',
            default => ucfirst($role),
        };
    }
}
