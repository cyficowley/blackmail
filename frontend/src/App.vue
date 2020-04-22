<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {

/* 4 */

--dark-1: #303C6C;
  --dark-2: #B4dFe5;
  --light-1: #F27D42;
  --light-2: #F4976C;
  --accent: #D2FDFF;

/*
camp site
--dark-1: #022449;
  --dark-2: #B4dFe5;
  --light-1: #F27D42;
  --light-2: #558DCA;
  --accent: #96FFFF; */
  /* C8Eff9 */


  /*
  5???
   --dark-1: #374785;
  --dark-2: #24305E;
  --light-1: #F76c6c;
  --light-2: #F76c6c;
  --accent: #A8D0E6; */

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
  color: white;
}

</style>
