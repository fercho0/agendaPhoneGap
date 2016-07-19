


var existe_db;
var db;
		

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
				/*navigator.notification.alert("Me estoy ejecutando");
				navigator.notification.alert(message, alertCallback, [title], [buttonName])
				*/
	
				msn("Iniciado JS desde el metodo");
		
		existe_db = window.localStorage.getItem("existe_db");
		db = window.openDatabase("agenda_curso","1.0","DB del curso phonegap",200000);
/*        db.transaction(populateDB, errorCB, successCB);*/

		
		
		if(existe_db == null){
			creaDB();
		}else{
			cargaDatos();
		}
		
		
		$("#b_guardar").click(function(e){
			if($.id != -1){
				saveEditForm();
			}else{
				saveNewForm();
			}
		});

		// $("#btn_buscar").click(function(e){
		// 	findContact();
		// 	msn("Buscando...");
		// });

	}
};


	/**************************/

   // Populate the database
    //
    function populateDB(tx) {
		 alert("creando");
        tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
				 alert("fin creando");
    }

    // Transaction error callback
    //
    function errorCB(err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }
	
	/**************************/


function msn(txt){
	alert("msn de: "+txt);	
}

function creaDB(){
	db.transaction(creaNuevaDB, errorDB, creaSuccess);
	//	window.localStorage.setItem("existe_db",1); 
	
	}
	

function creaNuevaDB(tx){
			tx.executeSql('DROP TABLE IF EXISTS agenda_curso');
			var sql = 'CREATE TABLE IF NOT EXISTS agenda_curso ( '+
			'id INTEGER PRIMARY KEY AUTOINCREMENT, '+
			'nombre VARCHAR(50), '+
			'apellidos VARCHAR(50), '+
			'telefono VARCHAR(30), '+
			'categoria VARCHAR(30), '+
			'foto VARCHAR(200), '+
			'email VARCHAR(30) ) ';
			
			tx.executeSql(sql);
			
			tx.executeSql("INSERT INTO agenda_curso (id,nombre,apellidos,telefono,categoria,foto,email) VALUES (1,'Jose','Perez','+5517471212313','amigos','','asd@gmail.com')");

tx.executeSql("INSERT INTO agenda_curso (id,nombre,apellidos,telefono,categoria,foto,email) VALUES (2,'Sirio','Gonzalez','+5517471212321','trabajo','','fzfz@gmail.com')");

tx.executeSql("INSERT INTO agenda_curso (id,nombre,apellidos,telefono,categoria,foto,email) VALUES (3,'Julio','Rodriguez','+5517471222213','familia','','fff@gmail.com')");		


}

function errorDB(err){
		 navigator.notification.alert("Error ejecutando sql: " + err);
}


function creaSuccess(){
	window.localStorage.setItem("existe_db",1); 
	cargaDatos();
}


function cargaDatos(){
	db.transaction(cargaRegistros,errorDB);	
}


function cargaRegistros(tx){
		tx.executeSql('SELECT * FROM agenda_curso',[],cargaDatosSuccess,errorDB);
	}
	
function cargaDatosSuccess(tx,results){
		msn("Rscibidos de la BD "+results.rows.length+" registros");
		if(results.rows.length === 0){
			navigator.notification.alert("No hay contactos en la base de datos");
		}
		for(var i =0; i< results.rows.length;i++){
			var persona = results.rows.item(i);
			var selector = $("#lista_" + persona.categoria+" ul");
			var foto = persona.foto;
			if(foto === ""){
				foto = "img/logo.png";
			}
			selector.append('<li id="li_'+ persona.id +'"><a href="#detalle" data-uid=' + persona.id + ' class="linkDetalles"><div class="interior_lista"><img src=' + foto + '	class="img_peq"/><span>' + persona.nombre + ' ' + persona.apellidos + '</span></div> </a><a href="#form" data-uid=' + persona.id + ' class="linkForm">Predet.</a></li>').listview('refresh');
		}
		
		$(".linkDetalles").click(function(e){
			$.id = $(this).data("uid");
		});
		
		$(".linkForm").click(function(e){
			$.id = $(this).data("uid");
		});	
	}
	
	
	
	/*
	Vista detalle
	*/
	$(document).on("pagebeforeshow","#detalle",function(){
		if(db != null){
			db.transaction(queryDBFindByID,errorDB);
		}
	});
	
	function queryDBFindByID(tx){
		tx.executeSql('SELECT * FROM agenda_curso WHERE id =' + $.id, [], queryDetalleSuccess,errorDB);
	}
	
	function queryDetalleSuccess(tx, results){
		msn("Rscibidos de la BD en vista detalle "+results.rows.length+" registros");
		if(results.rows.length === 0){
			msn(" se han recibido registros para la vista detalle");
			navigator.notification.alert("No hay detalles para ese elemento");
		}
		$.registro = results.rows.item(0);
		$("#categoria").html($.registro.categoria);
		
		var _foto = $.registro.foto;
		if(_foto == ""){
			_foto = "img/logo.png";
		}
		$("#foto_img").attr("src",_foto);
		$("#nombre").html($.registro.nombre + ' ' + $.registro.apellidos);
		$("#num_tel").html($.registro.telefono);
		$("#telefono").attr("href","tel:" + $.registro.telefono);
		$("#label_mail").html("Mail: " + $.registro.email);
	}
	
	
	/*
	Vista detalle
	*/
	//Vista de la pagina de edicion
	
	$(document).on('pagebeforeshow','#form',function(){
		console.log('ID recuperado en la vista form: ' + $.id);
		initForm();
		if(db != null && $.id != -1){
			db.transaction(queryDBFindByIDForm,errorDB);
		}else if($.idContact != -1 && $.id == -1){
			$.registro = $.contacts[$.idContact];
			$("#ti_nombre").val($.contacts[$.idContact].nombre);
			$("#ti_telefono").val($.contacts[$.idContact].telefono);
			$("#ti_email").val($.contacts[$.idContact].email);
			$.idContact = -1;
		}
	});
	
	
	function queryDBFindByIDForm(tx){
		tx.executeSql('SELECT * FROM agenda_curso WHERE id=' + $.id, [], queryFormSuccess, errorDB);
	}
	
	function queryFormSuccess(tx,results){
		msn("Rscibidos de la BD en vista Form "+results.rows.length+" registros");
		if(results.rows.length == 0){
			msn("No se han recibido registros para la vista form");
			navigator.notification.alert("No hay detalles para ese elemento");
		}
		$.registro = results.rows.item(0);
		$.imageURL = $.registro.foto;
		if($.imageURL == ""){
			$.imageURL = "img/logo.png";
		}
		$("#fotoEdit_img").attr("src",$.imageURL);
		
		$("#ti_nombre").val($.registro.nombre);
		$("#ti_apellidos").val($.registro.apellidos);
		$("#ti_telefono").val($.registro.telefono);
		$("#ti_email").val($.registro.email);
		
		$("#cat_" + $.registro.categoria).trigger("click").trigger("click");
	//$("#cat_" + $.registro.categoria).attr("checked",true).checkboxradio("refresh");
		
	}
	
	$(document).on('pagebeforeshow','#home',function(){
		$.id = -1;
	});
	
	function initForm(){
	$.imageURL = "img/logo.png";
	$("#fotoEdit_img").attr("src",$.imageURL);
	$("#ti_nombre").val("");
	$("#ti_apellidos").val("");
	$("#ti_telefono").val("");
	$("#ti_email").val("");
	
	$("#cat_familia").trigger("click").trigger("click");
	}
	
	
	/*Modificando registros*/
	function saveEditForm(){
		if(db != null){
			msn("saveEditForm start");
			db.transaction(queryDBUpdateForm, errorDB, updateFormSuccess);
			msn("saveEditForm end");
		}
	}
	
	function queryDBUpdateForm(tx){
			msn("queryDBUpdateForm start");
		var cat = $("#cajaCategorias").find("input:checked").val();
		tx.executeSql('UPDATE agenda_curso SET nombre="' + $("#ti_nombre").val() + '", apellidos="' + $("#ti_apellidos").val() + '", telefono="' + $("#ti_telefono").val() + '", email="' + $("#ti_email").val() +'",  categoria="' + cat +'",foto="' + $.imageURL +'" WHERE id=' + $.id) ;
			msn("queryDBUpdateForm end");
	}
	
	function updateFormSuccess(tx){
		msn("updateFormSuccess start");
		var selector = $("#li_" + $.id);
		var selector = $("#li_" + $.id).clone(true);
		selector.find("img").attr("src", $.imageURL);
		selector.find("a:first").find("span").html($("#ti_nombre").val() + " " + $("#ti_apellidos").val());
		
		$("#li_" + $.id).remove();
		var cat  = $("#cajaCategorias").find("input:checked").val();
		var lista = $("#lista_" + cat + " ul");
		lista.append(selector).listview('refresh');
		
		$.mobile.changePage("#home");
		msn("updateFormSuccess end");
	
	}
	
	/*Creando registros*/
	function saveNewForm(){
		if(db != null){
			db.transaction(queryDBInsertForm, errorDB);
		}
		
	}

	function queryDBInsertForm(tx){
			msn("queryDBInsertForm start");
		var cat = $("#cajaCategorias").find("input:checked").val();
		tx.executeSql("INSERT INTO agenda_curso (nombre,apellidos,telefono,categoria,foto,email) VALUES  ('" + $("#ti_nombre").val() 
			+ "','" + $("#ti_apellidos").val() + "','" + $("#ti_telefono").val() + "','" 
			+ cat + "','" + $.imageURL + "','" + $("#ti_email").val() + "')",[],newFormSuccess,errorDB);
			msn("queryDBInsertForm end");
	}

	function newFormSuccess(tx, results){
		msn("newFormSuccess start");
		var cat = $("#cajaCategorias").find("input:checked").val();
		var lista = $("#lista_" + cat + " ul");

		var obj = $('<li id="li_'+ results.insertId+'"><a href="#detalle" data-uid=' + results.insertId 
			+ ' class="linkDetalles"><div class="interior_lista"><img src="' + $.imageURL + '" class="img_peq"/><span>' 
			+ $("#ti_nombre").val() + " " + $("#ti_apellidos").val() + '</span></div> </a><a href="#form" data-uid=' + results.insertId
			+ ' class="linkForm">Predet.</a></li>');
		

		obj.find('.linkDetalles').bind('click', function(e){
			$.id = $(this).data('uid');
		});

		obj.find('.linkForm').bind('click', function(e){
			$.id = $(this).data('uid');
		});

		lista.append(obj).listview('refresh');

		$.mobile.changePage("#home");
		msn("newFormSuccess end");
	}

/*
Buscando contactos
*/

// function findContact(){
// 	var opciones = new ContactFindOptions();
// 	opciones.filter = $("#ti_search").val();
// 	var fields = ["name","displayName","emails","phoneNumbers"];
// 	navigator.contacts.find(fields,contactSuccess,contactError,opciones);
// }
// function contactSuccess(){
// 	var lista = $("#listaContactos ul")
// 	$.contacts=[];
// 	lista.html("");

// 	for (var i = 0; i < contacts.length; i++) {
// 		var contacto ={};
// 		contacto.nombre = contacts[i].name.familyName;

// 		if (contacts[i].phoneNumbers && (contacts[i].phoneNumbers.length>0)) {
// 			contacto.telefono = contacts[i].phoneNumbers[0].value();
// 		};

// 		if (contacts[i].emails && (contacts[i].emails.length>0)) {
// 			contacto.email = contacts[i].emails[0].value();
// 		};

// 		$contacts.push(contacto);


// 		lista.append("<li ><a href='#form' class='importContact' data-uid='" + i + "'>" + contacts[i].name.formatted 
// 			+ "</a></li>");
// 	}

// 	lista.listview('refresh');

// 	/*
	
// 	*/

// 	$('.importContact').bind('click',function(e){
// 		$.id = -1;
// 		$.idContact = $(this).data('uid');

// 	});

// }

// function contactError(){
// 	navigator.notification.alert("Error buscando contactos");
// }





























