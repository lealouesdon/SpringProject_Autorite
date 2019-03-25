var REFRESH_RATE = 3000; // ms
var ip_distant = "http://172.17.3.251:8080/";
var time = []
var hours = []
var mainData = [] // top main graph
var workData = [] // travaux

var actualData = [1];
var askedData = [1];

hours = ["7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h","17h","18h","19h","20h"];


refreshData();
setInterval(refreshData, REFRESH_RATE); // Set refresh rate

// ========= FUNCTIONS =========
function updateTitle(data) {
    $('#displayedData').text(data);
}

function refreshData() {
    // REFRESH SCORE
    $.get(ip_distant + '/score', function (score, status) {
        $('.odometer').html(score);
    });

    // Score by day
    $.get(ip_distant + '/scorejour', function (data, status) {
        mainData = []
        time = []
        data.forEach(function (elem) {
            mainData.push(elem[0])
            time.push(elem[1])
        })
        mainChart.data.datasets[0].data = mainData;
        mainChart.data.label = time;
        mainChart.update();
    });

    // travaux by day
    $.get(ip_distant + '/travauxjour', function (data, status) {
        time = []
        workData = []
        data.forEach(function (elem) {
            workData.push(elem[0])
            time.push(elem[1])
        })
        lineChart.data.datasets[0].data = workData;
        lineChart.data.labels = time;
        lineChart.update();
    });

    // Contrat / avancement du transporteur
    viewChartData = []
    viewsChart.data.labels = [0, 1]
    $.get(ip_distant + '/courses/confirm', function (nbConfirm, status) {
        viewsChartData.push(nbConfirm)
    })
    $.get(ip_distant + '/courses/annule', function (nbAnnule, status) {
        viewsChartData.push(nbAnnule)
    })
    viewsChart.update()

    // Courses / Statistiques des demandes
    stats = {
        'date' : [],
        'courses_dmd' : [],
        'courses_acp' : [],
        'courses_ann' : [],
        'couv_offre' : []
    }

    $.get(ip_distant + '/coursesday/demand', function (data, status) {
        data.forEach(function(elem){
            stats.courses_dmd.push(elem[0])
            stats.date.push(elem[1])
        })
    })

    $.get(ip_distant + '/coursesday/annule', function (data, status) {    })
    console.log(stats)



}
  /**
   * Tableau
   */
  addRowSillon(1,10,5,2);

  function addRowSillon(date,nbDemande, nbAccept, nbAnnule)
  {
           if (!document.getElementsByTagName) return;
           tabBody=document.getElementsByClassName("nbCourses").item(0);
           row=document.createElement("tr");

           cell1 = document.createElement("td");
           cell2 = document.createElement("td");
           cell3 = document.createElement("td");
           cell4 = document.createElement("td");
           cell5 = document.createElement("td");

           textnode1=document.createTextNode(date);
           textnode2=document.createTextNode(nbDemande);
           textnode3=document.createTextNode(nbAccept);
           textnode4=document.createTextNode(nbAnnule);
           //calcul du pourcentage
           var pourcent = nbAccept/nbDemande*100;
           textnode5=document.createTextNode(pourcent);

           cell1.appendChild(textnode1);
           cell2.appendChild(textnode2);
           cell3.appendChild(textnode3);
           cell4.appendChild(textnode4);
           cell5.appendChild(textnode5);

           row.appendChild(cell1);
           row.appendChild(cell2);
           row.appendChild(cell3);
           row.appendChild(cell4);
           row.appendChild(cell5);

           tabBody.appendChild(row);
  
  
  }

  /**
   * Tableau de notifications
   * 
   */

   addNotif("notif test!!","rien");
   addNotif("notif travaux test!!","travaux");

   function addNotif(text, type) {
        notifDiv=document.getElementsByClassName("notifDiv").item(0);
       var notif = document.createElement("div");
       var textnode = document.createTextNode(text);
       if(type=="travaux"){
           notif.className = "alert alert-primary";
            
       }else{
        notif.className = "alert alert-info";  
       }
       notif.appendChild(textnode);
       notifDiv.appendChild(notif);

       
   }