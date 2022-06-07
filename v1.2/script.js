const pokeCard = document.getElementById("pokeCard")

async function fetchPokemonData(number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
  const data = await response.json()

  // console.log(data)
  createPokemon(data)

}

// console.log(fetchPokemonData)

async function createPokemon(data) {
  // need: name, ID, type, img, ability, abilityText, Hp
  const pokeName = data.name.toUpperCase()
  const pokeID = data.id
  const pokeType = `${(data.types[0].type.name).replace(/^\w/, (c) => c.toUpperCase())} Pokemon`;
  const pokeImg = data.sprites.front_default

  const pokeHP = `${data.stats[0].base_stat} ${(data.stats[0].stat.name.toUpperCase())}`

  // Grabs ability name, and description
  const firstAbility = data.abilities[0].ability.name
  const firstAbilityText = await fetchAbility(data.abilities[0].ability.url)

  const secondAbility = data.abilities[1].ability.name
  const secondAbilityText = await fetchAbility(data.abilities[1].ability.url)

  // Create HTML elements
  const pokeCard = document.createElement("div")
  pokeCard.classList.add("pokeCard")

  // Poke INFO
  const pokeInfo = document.createElement("div")
  pokeInfo.classList.add("info")

  const pokemonType = document.createElement("p")
  pokemonType.classList.add("pokeType")
  pokemonType.textContent = pokeType

  // PokeName, append span Name and span HP
  const pokemonName = document.createElement("p")
  pokemonName.classList.add("pokeName")

  const pokemonNameSpanName = document.createElement("span")
  pokemonNameSpanName.textContent = pokeName
  pokemonNameSpanName.classList.add("name")

  const pokemonNameSpanHP = document.createElement("span")
  pokemonNameSpanHP.textContent = pokeHP
  pokemonNameSpanHP.classList.add("hp")

  const pokemonImgCont = document.createElement("div")
  pokemonImgCont.classList.add("image")

  const pokemonImg = document.createElement("img")
  pokemonImg.src = pokeImg
  pokemonImgCont.append(pokemonImg)

  const abilityCont = document.createElement("div")
  abilityCont.classList.add("abilities")

  const abilityTitle01 = document.createElement("h4")
  abilityTitle01.textContent = firstAbility

  const abilityDesc01 = document.createElement("p")
  abilityDesc01.textContent = firstAbilityText


  const abilityTitle02 = document.createElement("h4")
  abilityTitle02.textContent = secondAbility
  const abilityDesc02 = document.createElement("p")
  abilityDesc02.textContent = secondAbilityText

  abilityCont.append(abilityTitle01, abilityDesc01, abilityTitle02, abilityDesc02)

  // Append the Spans to the name p element
  pokemonName.append(pokemonNameSpanName, pokemonNameSpanHP)
  pokeInfo.append(pokemonType, pokemonName)
  pokeCard.append(pokeInfo, pokemonImgCont, abilityCont)
  console.log(pokeCard)

  document.querySelector("body").append(pokeCard)
}


async function fetchAbility(link) {
  const response = await fetch(link)
  const data = await response.json()
  
  const description = data.effect_entries[1].short_effect
  return description
  
}


