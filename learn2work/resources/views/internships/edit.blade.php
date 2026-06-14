@extends('layouts.app')

@section('content')
<div class="max-w-md mx-auto p-6">
    <h2 class="text-xl font-bold mb-4">Edit Pendaftaran Magang</h2>

    @if($errors->any())
        <div class="p-3 mb-4 bg-rose-100 text-rose-800 rounded">{{ $errors->first() }}</div>
    @endif

    <form action="{{ route('internships.update', $application->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PATCH')

        <div class="mb-4">
            <label class="block text-sm font-medium">Unggah CV (PDF)</label>
            <input type="file" name="cv_file" accept=".pdf" required class="mt-2" />
        </div>

        <div class="flex justify-end gap-2">
            <a href="{{ route('internships.index') }}" class="text-sm text-gray-500">Kembali</a>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded text-sm">Perbarui CV</button>
        </div>
    </form>
</div>
@endsection
