const pokeCard = document.getElementById("pokeCard")

async function fetchPokemonData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    const pokeData = await response.json()
    // console.log(pokeData)


    // pokeCard.append(image)

    renderData(pokeData)
}


fetchPokemonData()

function renderData(data) {
    // Get type of Pokemon; Normal, Psychci
    // const pokeType = data.types[0].type.name
    // console.log(pokeType)

    // How to get abilities
    const abilities = data.abilities
    let text = ""
    abilities.forEach(abilityData => {
        console.log(abilityData)
        const abilityName = abilityData.ability.name
        const abilityUrl = abilityData.ability.url

        const abilityText = fetchAbility(abilityUrl)
        .then(shortEffect => {
            // console.log(shortEffect)
        })
        }
        
        
        ) 

}

async function fetchAbility(linkToAbilityText) {
    const response = await fetch(linkToAbilityText, {})
    const json = await response.json()

    console.log(json)
    // console.log(json.effect_entries[1])
    // console.log(json.effect_entries[1].short_effect)
    return json.effect_entries
    // console.log(data)
    // console.log(data.effect_entries[1].short_effect)

}