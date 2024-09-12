<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tasks = Task::all();
            if ($tasks->isEmpty()){
                return response()->json([
                    'status' => 'success',
                    'message' => 'Nenhuma tarefa encontrada',
                    'data' => []
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Tarefas encontradas',
                'data' => $tasks
            ]);
        }catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'Ocorreu um erro ao tentar listar tarefas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $validator = validator::make($request->all(), ([
                'title' => 'required|max:255',
                'description' => 'nullable|string'
            ]));

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao cadastrar',
                    'error' => $validator->errors()], 422);
            }
        try {
            $task = Task::create($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Cadastrado com sucesso',
                'data' => $task
            ], 201);
        }catch (Exception $e){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Erro ao cadastrar',
                    'error' => $e->getMessage()
                ], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Tarefa encontrada',
                'data' => $task
            ]);
        }catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'Ocorreu um erro ao tentar listar a tarefa',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validator = validator::make($request->all(), ([
            'title' => 'required|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean'
        ]));
        if ($validator->fails()){
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar tarefa',
                'error' => $validator->errors()
            ],422);
        }

        $task->update($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Tarefa atualizada com sucesso',
            'data' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try {
            $task->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Tarefa removida com sucesso'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ocorreu um erro ao tentar remover a tarefa',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
