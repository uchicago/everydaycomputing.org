var g_url = "";
// elements array initialized
var elements = [];

$(function() {
  // console.log(elements)
  // on dom ready
  var cy = cytoscape({
    container: document.getElementById("cy"),

    boxSelectionEnabled: false,
    autounselectify: true,

    elements: elements,

    // layout: {
    //   name: "breadthfirst",
    //   directed: true,

    //   padding: 100,
    //   //name: 'preset',
    //   fit: true,
    //   avoidOverlap: true,
    //   avoidOverlapPadding: 150,
    //   spacingFactor: 1.8
    // },

    layout: {
      name: 'preset',
      // // name: "breadthfirst",
      directed: true,

      padding: 100,
      // //name: 'preset',
      fit: true,
      avoidOverlap: true,
      avoidOverlapPadding: 150,
      // spacingFactor: 1.8
    },

    ready: function() {
      window.cy = this;
    },

    style: [
      {
        selector: "edge",
        // style: {
        //   width: "4",
        //   "line-color":"data(color)",
        //   "target-arrow-color":"data(color)",
        //   "target-arrow-shape": "triangle",
        //   "curve-style": "bezier",
        //   "control-point-step-size": 40,
        //   "font-family": "liberation-sans, sans-serif",
        //   "font-weight": "600",
        //   "font-size": "60",
        //   label: "data(label)"
        // }
        style: {
          // width: "4",
          width: "2",
          "line-color":"data(color)",
          "target-arrow-color":"data(color)",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          "control-point-step-size": 40,
          "font-family": "liberation-sans, sans-serif",
          "font-weight": "600",
          "font-size": "20",
          "text-outline-color": "#fff",
          "text-outline-opacity": "1",
          "text-outline-width": "1",
          "text-background-color": "#fff",
          "text-background-opacity": "1",
          "text-background-shape": "roundrectangle",
          "text-background-padding": "1",
          label: "data(label)"
        }
      },
      {
        selector: "node",
        // style: {
        //   shape: "roundrectangle",
        //   "text-wrap": "wrap",
        //   "text-max-width": 325,
        //   "text-valign": "center",
        //   "font-family": "liberation-sans, sans-serif",
        //   "font-weight": "600",
        //   "font-size": "24",
        //   "border-width": "4px",
        //   height: 250,
        //   width: 350,
        //   padding: 10,
        //   label: "data(name)"
        // }
        style: {
          shape: "round-rectangle",
          "text-wrap": "wrap",
          "text-max-width": 90,
          "text-valign": "center",
          "font-family": "liberation-sans, sans-serif",
          "font-weight": "600",
          "font-size": "10",
          "border-width": "4px",
          "background-color": "#c6c6c6",
          "background-opacity": "0.5",
          // "text-background-opacity": "0.5",
          height: 100,
          width: 100,
          padding: 10,
          label: "data(name)"
        }
      },
      {
        selector: "node.beginning",
        style: {
          "border-color": "green",
          "border-style": "solid"
        }
      },
      {
        selector: "node.intermediate",
        style: {
          "border-color": "orange",
          "border-style": "solid"
        }
      },
      {
        selector: "node.advanced",
        style: {
          "border-color": "purple",
          "border-style": "solid"
        }
      },
      {
        selector: "node.unplugged",
        style: {
          "background-color": "#c6c6c6",
          color: "#0169D9"
        }
      },
      {
        selector: "node.programming",
        style: {
          "background-color": "white"
        }
      }
    ]
  });
  cy.fit();

  // reformats breadthfirst layout
  // function rotate() {
  //   setTimeout(function() {
  //     cy.nodes().positions(function(node, i) {
  //       return {
  //         x: node.position("y") * 0.8,
  //         y: node.position("x") * 0.7
  //       };
  //     });
  //     cy.fit();
  //   }, 100);
  // }
  // rotate();

  // right click menus, need support for understanding and action learning goals
  var my_context = cy.contextMenus({
    menuItems: [
      {
        id: "action_lgs",
        content: "Action Learning Goals",
        selector: "node",
        onClickFunction: function(event) {
          var target = event.target || event.cyTarget;
          var trajectory_key = target.data("trajectory_key");
          var node_key = target.data("node_key");
          if(target.data("alg_check") == 1) {
            var url = "/tools/trajectory/" + trajectory_key + "/visualization/" + node_key + "/action/";
            var win = window.open(url, '_blank', 'toolbar=0,location=0');
            if (!win) {
              alert("Please allow popups to see learning goals!");
            }
          } else {
            alert("This node has no action learning goals.")
          }
          // target.data("name", target.data("algs"));
          // cy
          //   .style()
          //   .selector(target)
          //   .style({
          //     "font-size": "60"
          //     // 'background-color': 'yellow'
          //   })
          //   .update();
          // var win = window.open(target.data("href")[0]["link"]);
          // if (!win) {
          //   alert("Please allow popups");
          // }
          // target.style({'font-size': "17"});
        }
      },
      {
        id: "understanding_lgs",
        content: "Understanding Learning Goals",
        selector: "node",
        onClickFunction: function(event) {
          var target = event.target || event.cyTarget;
          var trajectory_key = target.data("trajectory_key");
          var node_key = target.data("node_key");
          if(target.data("ulg_check") == 1) {
            var url = "/tools/trajectory/" + trajectory_key + "/visualization/" + node_key + "/understanding/";
            var win = window.open(url, '_blank', 'toolbar=0,location=0');
            if (!win) {
              alert("Please allow popups to see learning goals!");
            }
          } else {
            alert("This node has no understanding learning goals.")
          }
          
          // target.data("name", target.data("ulgs"));
          // target.style({'font-size': "17"});
          // console.log(target.position("y"));
          // cy
          //   .style()
          //   .selector(target)
          //   .style({
          //     "font-size": "60"
          //     // 'background-color': 'yellow'
          //   })
          //   .update();
          // var win = window.open(target.data("href")["url"]);
          // if (!win) {
          //   alert("Please allow popups");
          // }
        }
      }//,
      // {
      //   id: "arrow_activities",
      //   content: "Arrow Activities",
      //   selector: "edge.has_link",
      //   onClickFunction: function(event) {
      //     var target = event.target || event.cyTarget;
      //     var url = target.data("url")[0];
      //     var win = window.open(url, '_blank', 'toolbar=0,location=0');
      //     if (!win) {
      //       alert("Please allow popups to see learning goals!");
      //     }
      //     target.data("label", target.data("source"));
      //   }
      // }
    ]
  });
  var i = 0;
  var leng = elements.length
  for(i = 0; i < leng; i++) {
    if("classes" in elements[i]) {
      if(elements[i].classes.substring(0,8) == "has_link") {
        var count = 0; 
        var a_label = elements[i].data.label;
        for(ind in elements[i].data.url) {
          g_url = elements[i].data.url[ind];
          count++;
          console.log(count);
          my_context.appendMenuItem(
            {
              id: count + "arrow_activities_list" + a_label,
              content: "Arrow Activity " + count,
              selector: "edge." + a_label,
              onClickFunction: function(event, id) {
                var index = id.substring(0,1);
                var target = event.target || event.cyTarget;
                var a_url = target.data("url")[index - 1];
                console.log(index)
                var target = event.target || event.cyTarget;
                var win = window.open(a_url, '_blank', 'toolbar=0,location=0');
                if (!win) {
                  alert("Please allow popups to see learning goals!");
                }
              }
            }
          )
        }
      }
    }
  }

  var advancedButton = document.getElementById("advanced");
  advancedButton.addEventListener("click", function() {
    cy.$("*").show();
  });

  var intermediateButton = document.getElementById("intermediate");
  intermediateButton.addEventListener("click", function() {
    cy.$("*").show();
    cy.$(".advanced").hide();
  });

  var beginningButton = document.getElementById("beginning");
  beginningButton.addEventListener("click", function() {
    cy.$("*").show();
    cy.$(".advanced").hide();
    cy.$(".intermediate").hide();
  });

  var unpluggedButton = document.getElementById("unplugged-btn");
  unpluggedButton.addEventListener("click", function() {
    cy.$("*").show();
    cy.$(".programming").hide();
  });

  var programmingButton = document.getElementById("programming-btn");
  programmingButton.addEventListener("click", function() {
    cy.$("*").show();
    cy.$(".unplugged").hide();
  });

  // var scratchActivitiesBtn = document.getElementById("scratch-btn");
  // scratchActivitiesBtn.addEventListener("click", function() {
  //   window.open("")
  // })
  // var offComputerActivitiesBtn = document.getElementById("off-comp-btn");

  // on hover over nodes, highlight border
  cy.nodes().on("mouseover", function() {
    cy
      .style()
      .selector(this)
      .style({
        "border-color": "black",
        "border-width": "4px"
        // 'background-color': 'yellow'
      })
      .update(); // update the elements in the graph with the new style
  });

  // resets border
  cy.nodes().on("mouseout", function() {
    cy
      .style()
      .selector(this)
      .style({
        "border-color": function(node) {
          if (node.hasClass("beginning")) {
            return "green";
          } else if (node.hasClass("intermediate")) {
            return "orange";
          } else {
            return "purple";
          }
        },
        "border-width": "4px"
        // 'background-color': 'yellow'
      })
      .update(); // update the elements in the graph with the new style
  });
  var view1_btn = document.getElementById("view1");
  view1_btn.addEventListener("click", function() {
    var collection = cy.nodes();
        function get_name(ele) {
          return ele.data("id") + ': ' +ele.data("summary");
        }
        collection.map(function change_name(ele) {
          ele.data("name", get_name(ele));
          cy
            .style()
            .selector(ele)
            .style({
              // "font-size": "24"
              "font-size": "10"
            })
            .update();
          ele.data("clicked_var", 0);
        });
  });
  var view2_btn = document.getElementById("view2");
  view2_btn.addEventListener("click", function() {
    var collection = cy.nodes();
        function get_name(ele) {
          return ele.data("temp_name");
        }
        collection.map(function change_name(ele) {
          ele.data("name", get_name(ele));
          cy
            .style()
            .selector(ele)
            .style({
              // "font-size": "17"
              "font-size": "10"
            })
            .update();
          ele.data("clicked_var", 1);
        });
  });
  var view3_btn = document.getElementById("view3");
  view3_btn.addEventListener("click", function() {
    var collection = cy.nodes();
        function get_name(ele) {
          return ele.data("summary") + "\n\n" + ele.data("temp_name");
        }
        collection.map(function change_name(ele) {
          ele.data("name", get_name(ele));
          cy
            .style()
            .selector(ele)
            .style({
              // "font-size": "17"
              "font-size": "10"
            })
            .update();
          ele.data("clicked_var", 2);
        });
  });
  // changes text on click
  cy.nodes().on("click", function() {
    function fn1(node) {
      if (node.data("clicked_var") == 1) {
        node.data("clicked_var", 2);
        cy
          .style()
          .selector(node)
          .style({
            // "font-size": "17"
            "font-size": "10"
          })
          .update();
        var temp = node.data("summary") + "\n\n" + node.data("temp_name");
        return temp;
      } else if(node.data("clicked_var") == 2) {
        node.data("clicked_var", 0);
        cy
          .style()
          .selector(node)
          .style({
            // "font-size" : "24"
            "font-size": "10"
          })
          .update();
        
        return node.data("id") + ': ' + node.data("summary");
      } else {
        // var collection = cy.nodes();
        // function get_name(ele) {
        //   return ele.data("id") + ": " + ele.data("summary");
        // }
        // collection.map(function change_name(ele) {
        //   ele.data("name", get_name(ele));
        //   cy
        //     .style()
        //     .selector(ele)
        //     .style({
        //       "font-size": "24"
        //     })
        //     .update();
        // });
        node.data("clicked_var", 1);
        cy
          .style()
          .selector(node)
          .style({
            // "font-size": "24"
            "font-size": "10"
          })
          .update(); // update the elements in the graph with the new style
        return node.data("temp_name");
      }
    }
    this.data({ name: fn1(this) });

  });

}); // on dom ready

// reads in json data from jinja template values
function accept_data(input) {
  if(!('classes' in input)) {
    var data = input.data;
    // console.log(data)
    var source = data.source;
    var target = data.target;
    var label = data.label;
    var url = data.url;
    var unplugged = data.unplugged;
    var color = data.color;

    // console.log(label);
    if(url[0] != 'none') {
      elements.push({data : {source : source, target : target, label : label, color : color, url : url, unplugged : unplugged}, classes: "has_link " + label});
    } else {
      elements.push({data : {source : source, target : target, label : label, color : color, unplugged : unplugged}});
    }
    
  } else {
    var data = input.data;
    console.log(data);
    var classes = input.classes;
    var id = data.id;
    var summary = data.summary;
    var name = data.name;
    var temp_name = data.temp_name;
    var clicked_var = data.clicked_var;
    var node_urlsafe = data.node_urlsafe;
    var trajectory_urlsafe = data.trajectory_urlsafe;
    var ulg_check = data.ulg_check;
    var alg_check = data.alg_check;
    var href = data.href;
    var renderedPosition = {
      x: 0,
      y: 0
    };
    if('renderedPosition' in input) {
      renderedPosition = input.renderedPosition;
    }
    // console.log(id);
    elements.push({data : {id : id, summary : summary, temp_name : temp_name, name : id + ': ' + summary, 
          clicked_var : clicked_var, href : href, alg_check : alg_check, ulg_check : ulg_check,
          node_key : node_urlsafe, trajectory_key : trajectory_urlsafe
        }, 
        renderedPosition : renderedPosition,
      grabbable : true, classes : classes});
      console.log(renderedPosition);
  }

}
