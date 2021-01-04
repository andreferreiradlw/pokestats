import axios from 'axios'

function fetchTypeData(moves) {
  // return a promisse that resolves with moves data
  return new Promise(function (resolve, reject) {
    if (!moves.length) {
      // reject promisse
      reject('no moves')
    } else {
      // requests array
      let axiosRequests = []
      // create an axios request for each move
      moves.forEach(({ move }) => {
        axiosRequests.push(axios.get(move.url))
      })
      // moves axios requests
      axios
        .all(axiosRequests)
        .then(
          axios.spread((...responses) => {
            const movesData = responses.map((response, i) => {
              let responseData = response.data
              // version details from pokemon moves info
              responseData.version_group_details =
                moves[i].version_group_details
              // return
              return responseData
            })
            resolve(movesData)
          })
        )
        .catch(errors => {
          // react on errors.
          reject(errors)
          console.log('error', errors)
        })
    }
  })
}

function filterMoves(moves, learnMethod, versionGroup) {
  // return a promisse that resolves with filtered groupMoves
  return new Promise(function (resolve, reject) {
    // filter pokemon moves by learn method and game version
    const groupMoves = moves.filter(move => {
      const groupDetails = move.version_group_details
      const machineDetails = move.machines
      let match = false

      for (let i = 0; i < groupDetails.length; i++) {
        // check if version and learn method match
        if (
          groupDetails[i].version_group.name == versionGroup &&
          groupDetails[i].move_learn_method.name == learnMethod
        ) {
          // add level key to move
          move.level_learned_at = groupDetails[i].level_learned_at
          // matched!
          match = true
          break
        }
      }

      // check if learn method is machine
      if (match && learnMethod === 'machine') {
        for (let x = 0; x < machineDetails.length; x++) {
          if (machineDetails[x].version_group.name == versionGroup) {
            // if machine matches version
            // add url key to pokemon move
            move.current_version_machine = machineDetails[x].machine.url
            break
          }
        }
      }
      return match
    })

    if (groupMoves.length && learnMethod === 'level-up') {
      // sort moves by level
      groupMoves.sort((a, b) => a.level_learned_at - b.level_learned_at)
    }
    // resolve
    resolve(groupMoves)
  })
}

function getMachineNames(machineMoves) {
  // requests array
  const machineRequests = []
  // create an axios request for each move
  machineMoves.forEach(move => {
    // current_version_machine is available from filterMoves function
    machineRequests.push(axios.get(move.current_version_machine))
  })
  // return axios promisse
  return axios.all(machineRequests)
}

export { fetchTypeData, filterMoves, getMachineNames }
