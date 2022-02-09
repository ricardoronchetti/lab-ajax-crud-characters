const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/characters');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
        let text = ''
        response.data.forEach(eachCharacter =>
          text += `<li>
          <strong>id: </strong>${eachCharacter.id} <br>
          <strong>Name: </strong>${eachCharacter.name} <br>
          <strong>Occupation: </strong>${eachCharacter.occupation} <br>
          <strong>Is a Cartoon?: </strong>${eachCharacter.cartoon} <br>
          <strong>Weapon: </strong>${eachCharacter.weapon} <br>
          </li>`)
        document.querySelector('.character-info').innerHTML = text
      })
      .catch(err => console.log(err))
  })

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('.operation input').value

    charactersAPI
      .getOneRegister(characterId)
      .then(response => {
        let text = ''
        text += `<li>
          <strong>id: </strong>${response.data.id} <br>
          <strong>Name: </strong>${response.data.name} <br>
          <strong>Occupation: </strong>${response.data.occupation} <br>
          <strong>Is a Cartoon?: </strong>${response.data.cartoon} <br>
          <strong>Weapon: </strong>${response.data.weapon} <br>
          </li>`
        document.querySelector('.character-info').innerHTML = text
      })
      .catch(err => console.log(err))
  })

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('.delete input').value

    charactersAPI
      .deleteOneRegister(characterId)
      .then(response => {
        if (response.data === null) {
          document.querySelector("#delete-one").style.background = "red"
        } else {
          document.querySelector("#delete-one").style.background = "green"
        }
      })
      .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')

    const characterInfo = {
      id: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }
    charactersAPI
      .updateOneRegister(characterInfo.id, characterInfo)
      .then(response => {
        document.querySelector('#edit-character-form').reset()
        if (response.data === null) {
          document.querySelector(".mycolor").style.background = "red"
        } else {
          document.querySelector(".mycolor").style.background = "green"
        }
      })
      .catch(err => console.log(err))
  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll('#new-character-form input')
    console.log(inputs)

    const characterInfo = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
      .createOneRegister(characterInfo)
      .then(response => {
        document.querySelectorAll('#new-character-form input')
        document.querySelector('#new-character-form').reset()
        if (response.data === null) {
          document.querySelector("#send-data").style.background = "red"
        } else {
          document.querySelector("#send-data").style.background = "green"
        }
      })
      .catch(err => console.log(err))
  });
});