<script setup>
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
    courses: Array,
    teachers: Array
});

// Logic untuk form Assign / Update
const assignForm = useForm({
    teacher_id: ''
});

const updateTeacher = (courseId, teacherId) => {
    assignForm.teacher_id = teacherId;
    assignForm.patch(route('assignments.update', courseId), {
        preserveScroll: true,
        onSuccess: () => alert('Guru berhasil diupdate!')
    });
};

const removeTeacher = (courseId) => {
    if(confirm('Copot guru dari kursus ini?')){
        useForm({}).delete(route('assignments.destroy', courseId), {
            preserveScroll: true
        });
    }
};
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Manajemen Penugasan Guru</h1>

        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border p-2">Nama Kursus</th>
                    <th class="border p-2">Guru Saat Ini</th>
                    <th class="border p-2">Aksi / Assign Ulang</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="course in courses" :key="course.id">
                    <td class="border p-2">{{ course.title }}</td>
                    <td class="border p-2 text-center">
                        <span v-if="course.teacher">{{ course.teacher.name }}</span>
                        <span v-else class="text-red-500 italic">Belum Ada Guru</span>
                    </td>
                    <td class="border p-2 text-center flex gap-2 justify-center">
                        <select v-model="course.selected_teacher" @change="updateTeacher(course.id, course.selected_teacher)" class="border p-1">
                            <option disabled value="">Pilih Guru...</option>
                            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                                {{ teacher.name }}
                            </option>
                        </select>
                        <button v-if="course.teacher" @click="removeTeacher(course.id)" class="bg-red-500 text-white px-2 py-1 rounded">
                            Hapus
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>