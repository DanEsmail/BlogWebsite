
let exerciseArr = [];


function lookForExercise(arr, exercise)  {
  for (var i = 0; i < arr.length; i++) {
    if(arr[i] == exercise){
      return i;
    }
  }
  return -1;
}






$("#add-button").click(function(){
  let exercise = $("select[name=Exercise]").val();
  let rep = $("input[name=Rep]").val();
  let weight = $("input[name=Weight]").val();
  let exerciseNumber = lookForExercise(exerciseArr, exercise);
  let workoutBoxes = exerciseArr.length*5

  if (exerciseNumber > -1) {
    let x = (exerciseNumber)*5
    for (var i = 1; i < 6; i++) {
      if ($("input[name=rep-"+(x+i)+"]").val() == "") {
        $("input[name=rep-"+(x+i)+"]").attr('value', rep)
        $("input[name=weight-"+(x+i)+"]").attr('value', weight)
        let vol = parseInt($("#vol-"+exerciseNumber).text()) + (rep*weight);
        $("#vol-"+exerciseNumber).text(vol)
        break
      }
    }
  }else{
    exerciseArr.push(exercise)
    $("input[name=work-rows]").attr('value', exerciseArr.length)
    $("#workout-end").prepend(`
      <div class="workout-row">
        <div class="workout-name-box | in-box">
          <input class="Exercise-header" name="exercise-`+(exerciseArr.length-1)+`" value="`+exercise+`">
        </div>
        <div class="set-box  | in-box">
          <label for="rep-`+ (workoutBoxes+1) +`">Reps: </label>
          <input class="form-text" type="text" name="rep-`+ (workoutBoxes+1) +`" value="`+ rep +`"><br>
          <label for="weight-`+ (workoutBoxes+1) +`">Weight: </label>
          <input class="form-text" type="text" name="weight-`+ (workoutBoxes+1) +`" value="`+ weight +`">
        </div>
        <div class="set-box  | in-box">
          <label for="rep-`+ (workoutBoxes+2) +`">Reps: </label>
          <input class="form-text" type="text" name="rep-`+ (workoutBoxes+2) +`" value="" ><br>
          <label for="weight-`+ (workoutBoxes+2) +`">Weight: </label>
          <input class="form-text" type="text" name="weight-`+ (workoutBoxes+2) +`" value="" >
        </div>
        <div class="set-box  | in-box">
          <label for="rep-`+ (workoutBoxes+3) +`">Reps: </label>
          <input class="form-text" type="text" name="rep-`+ (workoutBoxes+3) +`" value="" ><br>
          <label for="weight-`+ (workoutBoxes+3) +`">Weight: </label>
          <input class="form-text" type="text" name="weight-`+ (workoutBoxes+3) +`" value="" >
        </div>
        <div class="set-box  | in-box">
          <label for="rep-`+ (workoutBoxes+4) +`">Reps: </label>
          <input class="form-text" type="text" name="rep-`+ (workoutBoxes+4) +`" value="" ><br>
          <label for="weight-`+ (workoutBoxes+4) +`">Weight: </label>
          <input class="form-text" type="text" name="weight-`+ (workoutBoxes+4) +`" value="" >
        </div>
        <div class="set-box  | in-box">
          <label for="rep-`+ (workoutBoxes+5) +`">Reps: </label>
          <input class="form-text" type="text" name="rep-`+ (workoutBoxes+5) +`" value=""><br>
          <label for="weight-`+ (workoutBoxes+5) +`">Weight: </label>
          <input class="form-text" type="text" name="weight-`+ (workoutBoxes+5) +`" value="">
        </div>
        <div class="total-vol">
          <p class="vol-text">Total Vol</p>
          <p class="vol-text" id="vol-`+(exerciseArr.length-1)+`">`+(rep*weight)+`</p>
        </div>
      </div>
      `)
  }
})
