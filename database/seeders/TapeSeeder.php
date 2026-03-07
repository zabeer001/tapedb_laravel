<?php

namespace Database\Seeders;

use App\Models\Tape;
use App\Models\User;
use Illuminate\Database\Seeder;

class TapeSeeder extends Seeder
{
    /**
     * Seed random contributor users and tapes for report graphs.
     */
    public function run(): void
    {
        $faker = fake();
        $contributorRoles = ['admin', 'editor', 'superadmin'];
        $targetContributors = 15;
        $tapeCount = 240;

        $existingContributors = User::query()
            ->whereIn('role', $contributorRoles)
            ->get();

        $missingContributors = max(0, $targetContributors - $existingContributors->count());

        if ($missingContributors > 0) {
            User::factory()
                ->count($missingContributors)
                ->create([
                    'role' => $faker->randomElement($contributorRoles),
                ]);
        }

        $ownerIds = User::query()
            ->whereIn('role', $contributorRoles)
            ->pluck('id')
            ->all();

        if (count($ownerIds) === 0) {
            return;
        }

        $titlePool = [
            'VHS Collection',
            'Classic Archive',
            'Cinema Vault',
            'Retro Reels',
            'Tape Master',
            'Midnight Screening',
            'Collector Cut',
            'Video Legacy',
            'Studio Edition',
            'Home Theater',
        ];
        $distributorPool = [
            'Warner Home Video',
            'Paramount Home Video',
            'MCA Universal',
            '20th Century Fox Home Entertainment',
            'Walt Disney Home Video',
            'Columbia TriStar Home Video',
            'New Line Home Video',
        ];
        $guardColors = ['Black', 'Green', 'Blue', 'Red', 'Yellow', 'Orange', 'Silver', 'White', 'Purple'];

        Tape::query()->delete();

        $rows = [];
        for ($index = 1; $index <= $tapeCount; $index++) {
            $isChecked = $faker->boolean(62);
            $year = (string) $faker->numberBetween(1980, 2005);

            $rows[] = [
                'user_id' => $faker->randomElement($ownerIds),
                'name' => 'Seeded Tape ' . $index,
                'title' => $faker->randomElement($titlePool) . ' ' . $faker->numberBetween(1, 999),
                'year' => $year,
                'distributor' => $faker->randomElement($distributorPool),
                'case_desc' => $faker->sentence(6),
                'seal' => $faker->boolean() ? 'Factory sealed' : 'Opened',
                'sticker' => $faker->boolean(45) ? 'Store sticker present' : 'No store sticker',
                'watermarks' => $faker->boolean(55) ? 'Watermark visible' : 'No watermark',
                'etching' => 'RUNOUT-' . strtoupper($faker->bothify('??###')),
                'notes' => $faker->sentence(10),
                'qa_checked' => $isChecked ? '1' : '0',
                'screener' => $faker->boolean(18) ? '1' : '0',
                'first_printer' => $faker->boolean(28) ? '1' : '0',
                'guard_color' => $faker->randomElement($guardColors),
                'upc' => (string) $faker->unique()->numerify('############'),
                'img1' => null,
                'img2' => null,
                'img3' => null,
                'img4' => null,
                'img5' => null,
                'img6' => null,
                'approved' => $isChecked,
                'created_at' => $faker->dateTimeBetween('-24 months', 'now'),
            ];
        }

        foreach (array_chunk($rows, 100) as $chunk) {
            Tape::query()->insert($chunk);
        }
    }
}
