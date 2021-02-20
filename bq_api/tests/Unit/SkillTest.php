<?php

namespace Tests\Unit;

use App\Skill;
use App\Course;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions; 

class SkillTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * Criar uma instância de skill [competência]
     *
     * @return void
     */

    public function testCriarSkill($nomeSkill = "Leitura e Escrita")
    {
        $curso_fk = Course::create([
            "initials" => "SIST",
            "description" => "Sistemas de Informação"
        ]);

        $skillTeste = Skill::create(["description" => $nomeSkill, "fk_course_id" => $curso_fk->id]);
        $this->assertInstanceOf(Skill::class, $skillTeste);
    }

    /**
     * Verifica a existência de uma instância de skill [competência]
     *
     * @return void
     */

    public function testContemSkill() {
        $this->testCriarSkill();

        $skillTeste = new Skill();
        $total_skill = $skillTeste->where("description", "Leitura e Escrita")->count();
        $this->assertEquals(1, $total_skill);
    }

    /**
     * Atualiza uma instância de skill [competência]
     *
     * @return void
     */

    public function testAtualizarSkill() {
        $this->testCriarSkill();

        $skillTeste = Skill::where("description", "Leitura e Escrita")->first();
        $skillTeste->description = "Compreensão Escrita";
        $skillTeste->save();
        $this->assertEquals(Skill::find($skillTeste->id)->first()->description, "Compreensão Escrita");
    }

    /**
     * Remove uma instância de skill [competência]
     *
     * @return void
     */

    public function testRemoverSkill() {
        $this->testCriarSkill();

        $skillTeste = new Skill();
        $idSkillTeste = $skillTeste->where("description", "Leitura e Escrita")->first()->id;
        $this->assertTrue(Skill::find($idSkillTeste)->delete());
    }
}
