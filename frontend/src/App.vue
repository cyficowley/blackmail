<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  --dark-1: white;
  --dark-2: white;
  --light-1: white;
  --light-2: white;
  --accent: white;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.dark-1{
  background-color: var(--dark-1) !important;
}
.dark-2{
  background-color: var(--dark-2) !important;
}
.light-1{
  background-color: var(--light-1) !important;
}
.light-2{
  background-color: var(--light-2) !important;
}
.accent-1{
  background-color: var(--accent) !important;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

h1, h2, h3, h4, h5, h6{
  font-family: 'Poppins', sans-serif;
}

</style>
