<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Comtele\Services\TextMessageService;


class UserController extends Controller
{
    /**
     * Undocumented function
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return 'Estou no index';
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate($this->user->rules(), $this->user->feedback());
        if(!$request->codigo) {
            $numeroAleatorio = rand(111111, 999999);
            $numeroTelefone = preg_replace('/[^0-9]/', '', $request->telefone);
        
            $API_KEY = "bb816887-0e8e-4086-8e3f-f16cfac9e813";
            $textMessageService = new TextMessageService($API_KEY);
            $result = $textMessageService->send(
            "",          // Sender: Id de requisicao da sua aplicacao para ser retornado no relatorio, pode ser passado em branco.
            $numeroAleatorio,      // Content: Conteudo da mensagem a ser enviada.
            [$numeroTelefone],  // Receivers: Numero de telefone que vai ser enviado o SMS.
            );
            print($result);
            return $numeroAleatorio;
        }
        
        return 'teste';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return 'Estou no show';
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return 'Estou no update';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return 'Estou no destroy';
    }
}