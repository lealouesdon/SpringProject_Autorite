/**
 * data pour le main graph : points
 */

 var time = ["Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 5", "Jour 6", "Jour 7", "Jour 8", "Jour 9", "Jour 10"];
 var hours = ["7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h","17h","18h","19h","20h"];
 var mainData = [50, 150, 100, 190, 130, 90, 150, 389, 120, 140];


 /**
  * Bar Graph : Contrat
  */

  var actualData = [10,100,150];
  var askedData = [50,50,50];

  /**
   * Travaux
   */
  var workData = [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630];

  function ChangeData(index)
{   
    console.log("passe");
    if(index==0){
        lineChart.data.datasets[0].data = [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630];
        lineChart.data.labels = time;
    }else{
        lineChart.data.datasets[0].data = [3, 4, 5, 5, 1, 3, 1]
        lineChart.data.labels = hours;

    }
    lineChart.update();
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
   * Points du Transporteur
   */

  $('.odometer').html(123);

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