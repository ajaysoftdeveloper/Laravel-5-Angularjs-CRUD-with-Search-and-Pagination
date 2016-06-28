<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Product;

class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
      
        $input = $request->all();
        $products=Product::query();
        if($request->get('search')){
            $products = $products->where("name", "LIKE", "%{$request->get('search')}%");
        }
		  $products = $products->paginate(5);
        
        return response($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
    	$input = $request->all();
        $create = Product::create($input);
        return response($create);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $product = Product::find($id);
        return response($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request,$id)
    {
    	$input = $request->all();

        $product=Product::find($id);
        $product->update($input);
        $product=Product::find($id);
        return response($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        return Product::where('id',$id)->delete();
    }
}
