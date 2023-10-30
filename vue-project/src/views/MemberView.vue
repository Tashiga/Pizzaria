<script setup lang="ts">
    import { ref, type Ref } from 'vue';

    type Member = {
        idMember: number;
        name: string;
        age: number;
        salaryPerMonth: number;
        photo: string;
    };

    const members: Ref<Member[]> = ref([
        {idMember: 1, name : 'Paul',age: 32, salaryPerMonth: 100, photo: getSrcOfPhoto('user-1.svg')},
        {idMember: 2, name : 'Pierre', age: 39, salaryPerMonth: 110, photo: ''},
        {idMember: 3, name : 'Pomme', age: 40, salaryPerMonth: 90, photo: ''},
    ]);
    const menu: Ref<string[]> = ref(['All members', 'Create new member']);
    let titleIsCreation: boolean = false;
    const nameToAdd: Ref<string> = ref('');
    const ageToAdd: Ref<number> = ref(0);
    const salaryToAdd: Ref<number> = ref(0);
    const photoToAdd: Ref<string> = ref('');

    function getSrcOfPhoto(photo: string) : string {
        return '@/assets/' + photo;
    }

    function onSelectedTitle(title: string) {
        if(title == 'Create new member')
            titleIsCreation = true;
        else 
            titleIsCreation = false;
        console.log(title);
        console.log(titleIsCreation == true);
    }

    function createNewMember(name: string, age: number, salaryPerMonth: number, photo: string) {
        members.value.push({idMember: members.value.length+1, name: name, age: age, salaryPerMonth: salaryPerMonth, photo: photo});
      }



    
</script>

<template>
    <main>
        <div>
            <ul>
                <li v-for="title in menu" @click="onSelectedTitle(title)">
                    <button>{{ title }}</button></li>
            </ul>
            <div>
                <div v-if="titleIsCreation">
                    <h1>Membre à ajouter : </h1>
                        <input type="text" placeholder="name" v-model="nameToAdd"/>
                        <input type="text" placeholder="age" v-model="ageToAdd"/>
                        <input type="text" placeholder="Salary per month" v-model="salaryToAdd"/>
                        <input type="text" placeholder="photo" v-model="photoToAdd"/>
                        <button @click="createNewMember(nameToAdd, ageToAdd, salaryToAdd, photoToAdd)">Créer</button>
                </div>
                <div v-else>
                    <table>
                        <thead>
                            <tr>
                            <th colspan="2"><h1>List of our members</h1></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="member in members">
                                <td class="case">
                                    Image : {{ member.photo }}
                                </td>
                                <td class = "case">{{ member.name }} reçoit {{ member.salaryPerMonth }} euros/mois.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       
    </main>
</template>

<style>

.case{
    border: 3px solid white;
}

</style>