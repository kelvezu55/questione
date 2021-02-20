<?php

namespace Tests\Unit;

use App\Course;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CourseTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * Criar uma instância de course.
     *
     * @return void
     */

    public function testCriarCourse($initials = "MEC", $descriptionCourse = "Mecatrônica")
    {
        $courseTeste = Course::create(["initials" => $initials, "description" => $descriptionCourse]);
        $this->assertInstanceOf(Course::class, $courseTeste);
    }

    /**
     * Verifica a existência de uma instância de course.
     *
     * @return void
     */

    public function testContemCourse() {
        $this->testCriarCourse();

        $courseTeste = new Course();
        $total_course = $courseTeste->where("initials", "MEC")->count();
        $this->assertEquals(1, $total_course);
    }

    /**
     * Atualiza uma instância de course.
     *
     * @return void
     */

    public function testAtualizarCourse() {
        $this->testCriarCourse();

        $courseTeste = Course::where("initials", "MEC")->first();
        $courseTeste->initials = "MECA";
        $courseTeste->save();
        $this->assertEquals(Course::find($courseTeste->id)->first()->initials, "MECA");
    }

    /**
     * Remove uma instância de course.
     *
     * @return void
     */

    public function testRemoverCourse() {
        $this->testCriarCourse();

        $courseTeste = new Course();
        $idCourseTeste = $courseTeste->where("initials", "MEC")->first()->id;
        $this->assertTrue(Course::find($idCourseTeste)->delete());
    }
}
