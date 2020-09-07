
const baseURL = 'https://swapi.dev/api';
const peopleUrl = 'people';
let charactersArr=[];
const planets= {};
const table = document.querySelector('.characters table');
// console.dir(table.style);    

//async map
async function asyncMap(array, callback) {
    // make an array to store our results
    const results = [];
    // loop over our array
    for (const item of array) {
      results.push(await callback(item));
    }
    // when we are done the loop, return it!
    return results;
  }

//get people array
const getAllPeople = async () => {
    const res = await fetch(`${baseURL}/${peopleUrl}`);
    const data = await res.json();
   return data.results;
}

//get planet by url
const getPlanetByURL = async (url) => {
    const res  =await fetch(url);
    const data = await res.json();
    const planet = {name: data.name, population: data.population};
    return planet;
} 

// create table element
const addCharactersToTable = (arr) => {
    const html = arr.map( p => {
        const tr = document.createElement('tr');
        tr.innerHTML= `
        
        <td> ${p.name} </td>
        <td> ${p.hair} </td> 
        <td> ${p.height} </td> 
        <td> ${p.planet.name} </td> 
        <td> ${p.planet.population} </td> 
        
        `;
        return tr;
    });

    const tableBody = document.querySelector('.characters table tbody');
    console.log(tableBody);
    html.forEach(element => {
        table.appendChild(element);
    });

    table.style.display = '';
    // document.querySelector('.loading').setAttribute('hidden',null);
    document.querySelector('.loading').toggleAttribute('hidden');
    

}

//onPage load start async set table and api
const  onLoad = async () => {
    table.style.display = 'none';

    const people = await getAllPeople();
    
    const characters = await asyncMap(people,async ({name,height,homeworld,hair_color}) =>{
        const home = await getPlanetByURL(homeworld);
        return {
            name:name,
            height: height,
            hair: hair_color,
            planet: home

        }
    } );
    charactersArr = [...charactersArr,characters];
   
   addCharactersToTable(characters);
}

onLoad();