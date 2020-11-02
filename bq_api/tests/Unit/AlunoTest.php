<?php

namespace Tests\Unit;

use App\Aluno;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions; 

class AlunoTest extends TestCase
{
    use DatabaseTransactions;
    /**
     * Criar uma instância de aluno.
     *
     * @return void
     */

    public function testCriarAluno($nomeAluno = "Joeldo Olinda")
    {
        $alunoTeste = Aluno::create(["nome" => $nomeAluno]);
        $this->assertInstanceOf(Aluno::class, $alunoTeste);
    }

    /**
     * Verifica a existência de uma instância de aluno.
     *
     * @return void
     */

    public function testContemAluno() {
        $this->testCriarAluno();

        $alunoTeste = new Aluno();
        $total_aluno = $alunoTeste->where("nome", "Joeldo Olinda")->count();
        $this->assertEquals(1, $total_aluno);
    }

    /**
     * Atualiza uma instância de aluno.
     *
     * @return void
     */

    public function testAtualizarAluno() {
        $this->testCriarAluno();

        $alunoTeste = Aluno::where("nome", "Joeldo Olinda")->first();
        $alunoTeste->nome = "Pedro Luis";
        $alunoTeste->save();
        $this->assertEquals(Aluno::find($alunoTeste->id)->first()->nome, "Pedro Luis");
    }

    /**
     * Remove uma instância de aluno.
     *
     * @return void
     */

    public function testRemoverAluno() {
        $this->testCriarAluno();

        $alunoTeste = new Aluno();
        $idAlunoTeste = $alunoTeste->where("nome", "Joeldo Olinda")->first()->id;
        $this->assertTrue(Aluno::find($idAlunoTeste)->delete());
    }
}
