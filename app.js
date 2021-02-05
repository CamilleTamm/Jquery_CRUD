var etudiants = [];
var edition = 0;

function setInputs(prenom, nom, email) {
	$('#prenom').val(prenom);
	$('#nom').val(nom);
	$('#email').val(email);
}

function refreshTab() {
	if(etudiants.length == 0) {
		$('#liste').html('');
		return;
	}
	
	var tableau = '<table><thead><tr>';
	tableau += '<th>id</th>';
	tableau += '<th>Firstname</th>';
	tableau += '<th>Lastname</th>';
	tableau += '<th>Email</th>';
	tableau += '<th></th>';
	tableau += '<th></th>';
	tableau += '</tr></thead>';
	tableau += '<tbody>';
	
	for(var i = 0; i < etudiants.length; i++) {
		tableau += '<tr>';
		
		tableau += '<td>' + i + '</td>';
		tableau += '<td>' + etudiants[i].prenom + '</td>';
		tableau += '<td>' + etudiants[i].nom + '</td>';
		tableau += '<td>' + etudiants[i].email + '</td>';
		tableau += '<td><button type="button" id="modifier">modifier</button></td>';
		tableau += '<td><button type="button" id="supprimer">supprimer</button></td>';

		tableau += '</tr>';
	}
	
	tableau += '</tbody></table>';

	$('#liste').html(tableau);
	
	$('button[id="supprimer"]').each(function(index) {		
		$(this).click(function() {
			if(etudiants.length > 1)
				etudiants.splice(index, 1);
			else
				etudiants = [];
			
			// si on était entrain de modifier cet étudiant alors on revient au mode ajouter
			if(index == edition && $('#ajouter').text() == 'Modifier') {
				setInputs('', '', '');
				$('#ajouter').text('Ajouter');
			}

			refreshTab();
		});
	});
	
	$('button[id="modifier"]').each(function(index) {
		$(this).click(function() {
			edition = index;

			setInputs(etudiants[edition].prenom, etudiants[edition].nom, etudiants[edition].email);
			$('#ajouter').text('Modifier');
		});
	});
}

$('#ajouter').click(function() {
	var prenom = $('#prenom').val();
	var nom = $('#nom').val();
	var email = $('#email').val();
	
	if(prenom == "" || nom == "" || email == "")
		return;
	
	if($(this).text() == 'Ajouter') {
		etudiants.push({'prenom' : prenom, 'nom' : nom, 'email' : email});
	} else {
		etudiants[edition] = {'prenom' : prenom, 'nom' : nom, 'email' : email};

		setInputs('', '', '');
		$(this).text('Ajouter');
	}
	
	refreshTab();
});
