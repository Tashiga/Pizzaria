<script setup lang="ts">
    import { ref, type Ref , onMounted, computed} from 'vue';
    import toastr from 'toastr';
    import 'toastr/build/toastr.min.css';
    import { useStore } from 'vuex';
    import i18n from '@/config/i18n';

    const store = useStore();
    const languages : Ref<string[]> = ref(['FR', 'EN']);
    const selectedLanguage : Ref<"FR" | "EN"> = ref('FR');
    const language = computed(() => store.getters.getLanguage);
    
    onMounted(async () => {
        selectedLanguage.value = language.value;
    });

    function getLanguages(): String[] {
        let v : String[] | any = languages.value;
        return v === undefined ? [] : v;
    }

    function changeLanguage() {
        store.dispatch('translate', selectedLanguage.value);
        i18n.global.locale.value = selectedLanguage.value;
    }


</script>

<template>
    <main>

        <div class="settingsContent">
            <div class="form">
                <h2>{{ $t('setting') }}</h2>

                <label for="language-selected">{{ $t('language') }}</label>

                <select id="language-selected" v-model="selectedLanguage" @change="changeLanguage">
                    <option v-for="(language, index) in getLanguages()" :key="index" :value="language">
                        {{ $t(String(language)) }}
                    </option>
                </select>
            </div>
                

            
        </div>
    </main>
</template>

<style>

.settingsContent {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

#language-selected{
    margin-left: 10px;
}

</style>