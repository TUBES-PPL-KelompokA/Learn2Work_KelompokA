<script setup> 
defineProps({ 
    course: Object, 
    enrollment: Object // Status enrollment dilempar dari controller 
}); 
</script> 
 
<template> 
    <div class="p-6 border rounded-lg shadow-sm"> 
        <h2 class="text-xl font-bold">{{ course.title }}</h2> 
         
        <div v-if="enrollment && enrollment.status === 'completed' class="mt-4"> 
            <p class="text-green-600 font-semibold mb-2">Selamat! Anda telah menyelesaikan 
kursus ini.</p> 
             
            <a :href="`/courses/${course.id}/certificate/download`"  
               class="inline-block bg-purple-600 text-white px-4 py-2 rounded 
hover:bg-purple-700"> 
                Unduh Sertifikat (PDF) 
            </a> 
        </div> 
         
        <div v-else class="mt-4 text-gray-500"> 
            <p>Selesaikan semua materi dan kuis untuk membuka sertifikat.</p> 
        </div> 
    </div> 
</template>