<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\NewsCollection;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::OrderByDesc('id')->paginate(6));
        return Inertia::render('Homepage', [
            'title' => 'Anthesis News',
            'desc' => 'Anthesis News Description dari controller',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'desc' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp',
        ]);

        $path = $request->file('image')->store('public/news');
        $url = Storage::url($path);

        $news = new News();
        $news->title = $request->title;
        $news->desc = $request->desc;
        $news->category = $request->category;
        $news->image = $url;
        $news->author = auth()->user()->email;
        $news->save();

        return redirect()->back()->with('message', 'Berita berhasil dibuat');
    }


    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $myNews = $news::where('author', auth()->user()->email)
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Dashboard', [
            'auth.myNews' => $myNews
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'desc' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp',
        ]);

        $news = News::findOrFail($request->id);

        $news->title = $request->title;
        $news->desc = $request->desc;
        $news->category = $request->category;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/news');
            $url = Storage::url($path);
            $news->image = $url;
        }

        $news->save();

        return redirect()->route('my.news')->with('message', 'Berita berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->back()->with('message', 'Berita berhasil dihapus');
    }
}
