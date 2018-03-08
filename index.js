$(document).ready(function() {

  //кнопка сабмит
  //$("#nonogramSubmit").on("click", function(e) {
   $("button").on("click", function(e) {  



   e.preventDefault();
   //   var nonogramClues = [[[1,1],[1,1,1,1],[1,2,1],[1,1],[1,2,2,1],[1,1],[1,2,1],[1,1],[6],[]],[[5],[1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1],[5]]];
   // var nonogramClues = $("#enteredNonogram").val();

   var idOfButton = $(this).attr("id");

   // [[[1,1],[2],[4],[2]],[[2],[4],[2],[1,1]]]



    if (idOfButton=='nonogramSubmit'){console.log('YES');} 
    else {return;};





    noooo = '[[[2],[2],[2],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[1,1],[2,2],[3,3],[4,4],[4,4],[4,4],[4,4],[2,4,2],[1,2,1]],[[6],[6],[6],[16],[3,2],[3,2],[16],[6],[6],[6]]]';
    var nonogramClues = JSON.parse(noooo);
    var xClues = nonogramClues[0];
    var yClues = nonogramClues[1];
    var width = yClues.length;
    var height = xClues.length;
    var output = "<tr class='fieldRow'><td class='corner'></td>";
    yClues.forEach(function(array){
      output += "<th class='columnClue' valign='bottom'>";
      for (i = 0; i < array.length; i++) {
        output += array[i] + "</br>";
      }
      output += "</th>";
    })
    output += "</tr>";
    xClues.forEach(function(array){
      output += "<tr class='fieldRow'><th class='rowClue'>";
      for (var i=0; i < array.length; i++) {
        output += array[i] + " ";
      }
      output += "</th>";
      for (var i=0; i < width; i++){
        output += "<td class='fieldData0'></td>";
      }
      output += "</tr>";
    })
    
    console.log(output+'hhjhjh');
    $("#playField").html(output);
    
  })


  //анализ ячеек игры
  $("#playField").on("mouseenter", "td", function() {
    if ($(this).hasClass("fieldData0")) {
      $(this).removeClass("fieldData0");
      $(this).addClass("fieldData1");
    } else if ($(this).hasClass("fieldData1")) {
      $(this).removeClass("fieldData1");
      $(this).addClass("fieldData2");
    }
    else if ($(this).hasClass("fieldData2")) {
      $(this).removeClass("fieldData2");
      $(this).addClass("fieldData0");
    }
    ;
 //   $("#playField .tableRow")
});
  });
  
  

  //анализ ячеек старта
  $("#field").on("click", "td", function() {
    if ($(this).hasClass("fieldData0")) {
      $(this).removeClass("fieldData0");
      $(this).addClass("fieldData1");
    } else if ($(this).hasClass("fieldData1")) {
      $(this).removeClass("fieldData1");
      $(this).addClass("fieldData0");
      return;
    };
  });
  

  //создание стартоваой таблицы
  $("#startMake").on("click", function(e) {
    e.preventDefault();
    var returnval = "";
    var width = $("#fieldWidth").val();
    var height = $("#fieldHeight").val();
    for (i = 0; i < height; i++) {
      returnval += "<tr id='fieldRow" + i + "' class='fieldRow'>";
      for (j = 0; j < width; j++) {
        returnval += "<td id='fieldDatax" + j + "y" + i + "' class=\"fieldData0\"></td>";
      };
      returnval += "</tr>";
    }
    console.log(returnval+'rrrrrr');
    $("#field").html(returnval);
  });
  



  //кнопка генерации
  $("#nonogramGenerate").on("click", function(e) {
    var nonogramArray = [];
    $(".fieldRow").each(function() {
      var tempArray = [];
      var rowQuery = "#" + $(this).attr("id") + " td";
      $(rowQuery).each(function() {
        var value = $(this).attr("class").substring(9, 10);
        tempArray.push(parseInt(value));
      })
      nonogramArray.push(tempArray);
    })
    console.log(nonogramArray);
    var output = stringify(griddlify(nonogramArray));
    console.log(griddlify(nonogramArray));
    $("#madeNonogram").html(output);
  })
})

var stringify = function(object) {
  var output = '<p>[[';
  for (i = 0; i < object.rows.length; i++) {
    output += "[" + object.xClues[i] + "]";
    if (i < object.rows.length - 1) {
      output += ","
    }
  };
  output += "],[";
  for (i = 0; i < object.columns.length; i++) {
    output += "[" + object.yClues[i] + "]";
    if (i < object.columns.length - 1) {
      output += ","
    }
  };
  output += "]]</p>"
  return output;
};

var griddlify = function(array) {

  var rowArray = [];
  var colArray = [];
  var numColumns = array[0].length;
  var columns = [];
  for (i = 0; i < numColumns; i++) {
    columns.push([])
  }

  array.forEach(function(subArray) {
    var counter = 0;
    var tempArray = [];
    for (i = 0; i < subArray.length; i++) {
      columns[i].push(subArray[i]);
      if (subArray[i] === 1) {
        counter++
      }
      if (subArray[i] === 1 && subArray[i + 1] !== 1) {
        tempArray.push(counter);
        counter = 0
      }
    }
    console.log(tempArray);
    rowArray.push(tempArray);
  });

  columns.forEach(function(subArray) {
    var counter = 0;
    var tempArray = [];
    for (i = 0; i < subArray.length; i++) {
      if (subArray[i] === 1) {
        counter++
      }
      if (subArray[i] === 1 && subArray[i + 1] !== 1) {
        tempArray.push(counter);
        counter = 0
      }
    }
    colArray.push(tempArray);
  });
  var nonogram = {
    "columns": columns,
    "rows": array,
    "xClues": rowArray,
    "yClues": colArray
  };

  return nonogram;

};

var binaryGenerator = function(tableRow) {
  var tempArray = [];
  var rowQuery = "#" + $(this).attr("id") + " td";
  $(rowQuery).each(function() {
    var value = $(this).attr("class").substring(9, 10);
    tempArray.push(parseInt(value));
  })
  nonogramArray.push(tempArray);
}

//* sample nonogram
//* [[1,1,1,1],[1,1,0,1],[0,0,1,0],[0,1,1,1]]