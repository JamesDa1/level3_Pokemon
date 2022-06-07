const pokeCard = document.getElementById("pokeCard")
const userInput = document.querySelector("#userInput")
const searchBtn = document.querySelector("#search")
searchBtn.addEventListener("click", function () {
  if (!userInput.value) return
  fetchPokemonData(userInput.value)
})

userInput.addEventListener("change", function () {
  if (!userInput.value) return
  fetchPokemonData(userInput.value)
})
async function fetchPokemonData(number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
  const data = await response.json()

  createPokemon(data)
}

async function createPokemon(data) {
  // need: name, ID, type, img, ability, abilityText, Hp
  // Create HTML elements
  const pokeCard = document.createElement("div")
  pokeCard.classList.add("pokeCard")

  // Poke INFO
  const pokeInfo = document.createElement("div")
  pokeInfo.classList.add("info")

  const pokeType = document.createElement("p")
  pokeType.classList.add("pokeType")
  pokeType.textContent = `${data.types[0].type.name.replace(/^\w/, (c) =>
    c.toUpperCase()
  )} Pokemon`

  // PokeName, append span Name and span HP
  const pokeName = document.createElement("p")
  pokeName.classList.add("pokeName")

  const pokeNameSpanName = document.createElement("span")
  pokeNameSpanName.textContent = data.name.toUpperCase()
  pokeNameSpanName.classList.add("name")

  const pokeNameSpanHP = document.createElement("span")
  pokeNameSpanHP.textContent = `${
    data.stats[0].base_stat
  } ${data.stats[0].stat.name.toUpperCase()}`
  pokeNameSpanHP.classList.add("hp")

  const pokeImgCont = document.createElement("div")
  pokeImgCont.classList.add("image")

  const pokeImg = document.createElement("img")
  pokeImg.src = data.sprites.front_default
  pokeImgCont.append(pokeImg)

  const abilityCont = document.createElement("div")
  abilityCont.classList.add("abilities")

  const abilityTitle01 = document.createElement("h4")
  abilityTitle01.textContent = data.abilities[0].ability.name

  const abilityDesc01 = document.createElement("p")
  abilityDesc01.textContent = await fetchAbility(data.abilities[0].ability.url)

  const abilityTitle02 = document.createElement("h4")
  abilityTitle02.textContent = data.abilities[1].ability.name

  const abilityDesc02 = document.createElement("p")
  abilityDesc02.textContent = await fetchAbility(data.abilities[1].ability.url)

  abilityCont.append(
    abilityTitle01,
    abilityDesc01,
    abilityTitle02,
    abilityDesc02
  )

  // Append the Spans to the name p element
  pokeName.append(pokeNameSpanName, pokeNameSpanHP)
  pokeInfo.append(pokeType, pokeName)
  pokeCard.append(pokeInfo, pokeImgCont, abilityCont)
  console.log(pokeCard)
  const cardBorder = document.createElement("div")
  cardBorder.classList.add("wrapper")
  cardBorder.append(pokeCard)

  document.querySelector("main").append(cardBorder)
}

async function fetchAbility(link) {
  const response = await fetch(link)
  const data = await response.json()

  const description = data.effect_entries[1].short_effect
  return description
}
