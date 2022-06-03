const pokeCard = document.getElementById("pokeCard")

async function fetchPokemonData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  const data = await response.json()

  console.log(data)
  createPokemon(data)

  //   return data
}

// console.log(fetchPokemonData)

async function createPokemon(data) {
  // need: name, ID, type, img, ability, abilityText, Hp

  const pokeName = data.pokeName
  const pokeID = data.id
  const pokeType = data.types[0].type.name
  const pokeImg = data.sprites.front_default

  const pokeHP = `${data.stats[0].base_stat} ${data.stats[0].stat.name} `

  console.log(data)
  const abilities =  fetchAbility(data)
  console.log(abilities)
  // Containers
}

fetchPokemonData()

async function fetchAbility(data) {
  const abilityText =  data.abilities.forEach((element) => {
    const res = await fetch(element.ability.url)
    const data = await res.json()
  })
}

function sum(a, b) {
  return a + b
}
