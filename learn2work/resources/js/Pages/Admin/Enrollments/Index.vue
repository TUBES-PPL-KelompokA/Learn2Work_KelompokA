<script setup>
import { useForm, Link } from '@inertiajs/vue3';

defineProps({
    enrollments: Array
});

const form = useForm({});

const approvePayment = (id) => {
    if (confirm('Apakah Anda yakin ingin menyetujui pembayaran ini?')) {
        form.patch(route('admin.payments.approve', id));
    }
};
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Verifikasi Pembayaran</h1>
        
        <div v-if="$page.props.flash.success" class="p-4 mb-4 text-green-700 bg-green-100 rounded">
            {{ $page.props.flash.success }}
        </div>

        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border p-2">Nama Siswa</th>
                    <th class="border p-2">Kursus</th>
                    <th class="border p-2">Bukti Bayar</th>
                    <th class="border p-2">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="enrollment in enrollments" :key="enrollment.id" class="text-center">
                    <td class="border p-2">{{ enrollment.user.name }}</td>
                    <td class="border p-2">{{ enrollment.course.title }}</td>
                    <td class="border p-2">
                        <a :href="'/storage/' + enrollment.payment_proof" target="_blank" class="text-blue-500 underline">Lihat Bukti</a>
                    </td>
                    <td class="border p-2">
                        <button @click="approvePayment(enrollment.id)" class="bg-green-500 text-white px-4 py-1 rounded" :disabled="form.processing">
                            Approve
                        </button>
                    </td>
                </tr>
                <tr v-if="enrollments.length === 0">
                    <td colspan="4" class="border p-4 text-gray-500">Tidak ada pembayaran pending.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>