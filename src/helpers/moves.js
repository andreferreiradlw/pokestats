const filterMoves = (moves, learnMethod, versionGroup) => {
  // filter pokemon moves by learn method and game version
  const groupMoves = moves.filter(move => {
    const groupDetails = move.version_group_details
    let found = false
    for (var i = 0; i < groupDetails.length; i++) {
      if (
        groupDetails[i].version_group.name == versionGroup &&
        groupDetails[i].move_learn_method.name == learnMethod
      ) {
        found = true
        break
      }
    }
    return found
  })

  console.log(groupMoves)
  return groupMoves
}

export { filterMoves }
