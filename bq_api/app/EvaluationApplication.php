<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EvaluationApplication extends Model
{
    protected $table = 'evaluation_application';
    protected $fillable = ['id', 'id_application', 'description','fk_evaluation_id', 'status',
        'random_questions', 'show_results'];
    protected $hidden = [];

    public function evaluation(){
        return $this->belongsTo(Evaluation::class, 'fk_evaluation_id')
            ->with('user');
            //->with('questions');
    }

    public function evaluationWithQuestions(){
        return $this->belongsTo(Evaluation::class, 'fk_evaluation_id')
            ->with('user')
            ->with('questions');
    }
}
