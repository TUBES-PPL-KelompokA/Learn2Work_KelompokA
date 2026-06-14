@extends('layouts.app')

@section('content')
<div class="max-w-4xl mx-auto p-6">
    <h2 class="text-xl font-bold mb-4">Daftar Pendaftaran Magang Saya</h2>

    @if(session('success'))
        <div class="p-3 mb-4 bg-green-100 text-green-800 rounded">{{ session('success') }}</div>
    @endif

    @if($applications->isEmpty())
        <p class="text-sm text-gray-500">Belum ada pendaftaran magang.</p>
    @else
        <table class="w-full border-collapse">
            <thead>
                <tr class="text-left text-sm text-gray-600">
                    <th>Perusahaan</th>
                    <th>Posisi</th>
                    <th>CV</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach($applications as $app)
                    <tr class="border-t">
                        <td class="py-3">{{ $app->partnerCompany->name ?? '-' }}</td>
                        <td class="py-3">{{ $app->internshipOpening->title ?? 'Umum' }}</td>
                        <td class="py-3">
                            @if($app->cv_path)
                                <a href="{{ asset('storage/'.$app->cv_path) }}" target="_blank" class="text-indigo-600">Lihat CV</a>
                            @else
                                -
                            @endif
                        </td>
                        <td class="py-3">
                            <a href="{{ route('internships.edit', $app->id) }}" class="text-sm text-indigo-600 mr-3">Edit</a>

                            <form action="{{ route('internships.destroy', $app->id) }}" method="POST" style="display:inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('Batalkan pendaftaran?')" class="text-sm text-rose-600">Batalkan</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</div>
@endsection
