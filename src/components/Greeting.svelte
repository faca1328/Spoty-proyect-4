<script lang="ts">
    const getDate = new Date();
    const currentDate = getDate.getHours();

    let greetings = "";

    if (currentDate < 12){
        greetings = "Good Morning"
    } else if (currentDate < 18){
        greetings = "Good Afternoon"
    } else {
        greetings = "Good Night"
    }
</script>

<h1 class="text-3xl py-4 text-gray-300/95">{greetings}</h1>