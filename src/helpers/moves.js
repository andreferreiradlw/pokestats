import axios from 'axios';

function useNull() {
  return null;
}

function fetchTypeData(moves) {
  // return a promisse that resolves with moves data
  return new Promise((resolve, reject) => {
    if (!moves.length) {
      // reject promisse
      reject(new Error('no moves'));
    } else {
      // requests array
      let axiosRequests = [];
      // create an axios request for each move
      moves.forEach(({ move }) => {
        axiosRequests.push(axios.get(move.url).catch(useNull));
      });
      // moves axios requests
      axios
        .all(axiosRequests)
        .then(
          axios.spread((...responses) => {
            const movesData = responses
              .map((response, i) => {
                if (response !== null) {
                  let responseData = response.data;
                  // version details from pokemon moves info
                  responseData.version_group_details = moves[i].version_group_details;
                  // return
                  return responseData;
                }
                return null;
              })
              .filter(data => data);
            resolve(movesData);
          }),
        )
        .catch(errors => {
          // react on errors.
          reject(errors);
        });
    }
  });
}

function filterMoves(moves, learnMethod, versionGroup) {
  // return a promisse that resolves with filtered groupMoves
  return new Promise(resolve => {
    // filter pokemon moves by learn method and game version
    const groupMoves = moves.filter(move => {
      const groupDetails = move.version_group_details;
      const machineDetails = move.machines;
      let match = false;

      for (let moveGroup of groupDetails) {
        // check if version and learn method match
        if (
          moveGroup.version_group.name === versionGroup[0] &&
          moveGroup.move_learn_method.name === learnMethod
        ) {
          // add level key to move
          move.level_learned_at = moveGroup.level_learned_at;
          // matched!
          match = true;
          break;
        }
      }
      // check if learn method is machine
      if (match && learnMethod === 'machine') {
        for (let machineMove of machineDetails) {
          if (machineMove.version_group.name === versionGroup[0]) {
            // if machine matches version
            // add url key to pokemon move
            move.current_version_machine = machineMove.machine.url;

            break;
          }
        }
      }
      return match;
    });

    if (groupMoves.length && learnMethod === 'level-up') {
      // sort moves by level
      groupMoves.sort((a, b) => a.level_learned_at - b.level_learned_at);
    }
    // resolve with filtered moves
    resolve(groupMoves);
  });
}

function getMachineNames(machineMoves) {
  // requests array
  const machineRequests = [];
  // create an axios request for each move
  machineMoves.forEach(move => {
    // current_version_machine is available from filterMoves function
    machineRequests.push(axios.get(move.current_version_machine).catch(useNull));
  });
  // return axios promisse
  return axios.all(machineRequests);
}

export { fetchTypeData, filterMoves, getMachineNames };
