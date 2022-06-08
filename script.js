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
async function fetchPokemonData(query) {
  console.log(typeof userInput.value)
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`) // pokeApi only takes lowercase strings pikachu != Pikachu
  const data = await response.json()
  createPokemon(data)
}

async function createPokemon(data) {
  const divWrapper = document.createElement("div")
  const divPokeCard = document.createElement("div")

  // Line above Name containing: Type and DexID
  const divInfo = document.createElement("div") // Contains: divInfoUpper, divInfoLower

  const divInfoUpper = document.createElement("div") // Contains: type and dexID
  const paragraphType = document.createElement("p")
  const paragraphDexID = document.createElement("p")

  const divInfoLower = document.createElement("div") // Contains Name and HP
  const paragraphName = document.createElement("a")
  const paragraphHP = document.createElement("p")

  const divImage = document.createElement("div")
  const imgSprite = document.createElement("img")
  const divAbilities = document.createElement("div")

  // adding classes
  divWrapper.classList.add("wrapper")
  divPokeCard.classList.add("pokeCard")

  divInfo.classList.add("info")
  divInfoUpper.classList.add("infoUpper")
  divInfoLower.classList.add("infoLower")
  divImage.classList.add("image")

  divAbilities.classList.add("ability")

  paragraphType.classList.add("type")
  paragraphName.classList.add("name")
  paragraphDexID.classList.add("dexID")
  paragraphHP.classList.add("hp")

  // Adding data
  paragraphType.textContent = data.types
    .map((e) => {
      return capitalizeString(e.type.name)
    })
    .join("/")
  paragraphDexID.textContent = data.id
  paragraphName.textContent = capitalizeString(data.name)
  paragraphName.href = `https://pokemon.fandom.com/wiki/${data.name}`
  paragraphName.target = "_blank"
  paragraphHP.textContent = data.stats
    .map((stats) => {
      if (stats.stat.name === "hp") {
        return `${stats.base_stat} ${stats.stat.name.toUpperCase()}`
      }
    })
    .join("")
  imgSprite.src = data.sprites.front_default
  imgSprite.alt = "Pokemon"

  const abilityData = data.abilities.map((ability) => {
    return Array(capitalizeString(ability.ability.name), ability.ability.url)
  })

  // Number of abilities can vary, using .map to account for it
  abilityData.map(async (e) => {
    const response = await fetch(e[1])
    const data = await response.json()

    const abilityDescription = data.effect_entries
      .map((e) => {
        if (e.language.name === "en") {
          return e.short_effect
        } else {
          return ""
        }
      })
      .join("")

    const abilityTitle = document.createElement("h4")
    const abilityText = document.createElement("p")
    abilityTitle.textContent = e[0].toUpperCase()
    abilityText.textContent = abilityDescription

    divAbilities.append(abilityTitle, abilityText)
  })

  divInfoUpper.append(paragraphType, paragraphDexID)
  divInfoLower.append(paragraphName, paragraphHP)
  divInfo.append(divInfoUpper, divInfoLower)

  divImage.append(imgSprite)

  divPokeCard.append(divInfo, divImage, divAbilities)
  divWrapper.append(divPokeCard)
  document.querySelector("main").append(divWrapper)
 
  userInput.value = ""
  userInput.focus()
}

// Capitalizes the first letter of a string
function capitalizeString(string) {
  return string.replace(/^\w/, (c) => c.toUpperCase())
}

window.onclick = (event) => {
  if (event.target.tagName === "IMG") {
    event.target.parentNode.parentNode.parentNode.remove()
  }
}
