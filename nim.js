function getRandom(min,max)
{
    return (Math.round(Math.random()*(max-min)))+min;
}
function debug(debug_text) {
	document.getElementById("debug").innerHTML += "<br />" + debug_text;
}
function Nim(player1, player2) {
    var board_id = 'nim-board';
    var board = document.getElementById(board_id);
    this.player = 1;
    var start_turn_checked = 0;
    var end_turn_button = document.getElementById('end-turn-button');
    var total_heaps = getRandom(3,5);
    this.nim_objects = new Array();
    var computerAI = null;
    var self =  this;
    
    var init = function() {
        /* do some initial setup */
        var inputs = new Array();
        setup_board();
        
        end_turn_button.onclick = function() { 
            self.end_turn_button_handler()
        }
        computerAI = new AI(this);
        this.set_message("Player " + self.player + " its your turn");
        player_go();
    }
    this.display_winning_message = function() {
        var url = "#TB_inline?height=65&amp;width=300&amp;inlineId=winnerMessage"
	var msg = self.player + ' Wins!! Good Game, better luck next time player ' + (self.player == 1 ? ' 1' : '2') + ".";
	if (self.player == 1 && player1 == "computer" || self.player == 2 && player2 == "computer") {
		msg = "Computer Wins. Better luck next time";
	}
        $('#winnerMessage').html('<div id="message-popup">' + msg + '<br /><a onclick="tb_remove();">Close</a></div>');
        tb_show(null, url, null);
    }
    var determine_next_player = function() {
        if (self.player == 1) {
        	self.player = 2
        } else {
        	self.player = 1
        }
    }
    var player_go = function() {
        if ((self.player == 1 && player1 == "computer") || (self.player == 2 && player2 == "computer")) {
        	computerAI.move();
        }
    }
    
    this.end_turn_button_handler = function() {
        debug('end turn player ' + self.player)
        if (all_heaps_checked()) {
        	debug('game won by player ' + self.player);
        	display_winning_message();
            return;
        }        
        start_turn_checked = 0;
        set_checkboxes_permanent();
        
        end_turn_button.disabled = true;
        set_all_rows(false);
        determine_next_player();
        set_message('Player ' + self.player + " its your turn");
        player_go();
    }
    
    this.update_button = function() {
        end_turn_button.disabled = (start_turn_checked == 0);
    }
    var setup_board = function() {
        var rows = new Array();
        prev = 0;
        board.innerHTML = ''
        for ( var i = 0; i < total_heaps; i++) {
            rows[i] = getRandom(prev+1, prev+3)
            prev = rows[i];
        }
        for ( var i = 0; i < total_heaps; i++) {
            var row = document.createElement('div');
            var id = "row-" + i;
            row.setAttribute("id", id);
            row.setAttribute("class", "heap");
            self.nim_objects[i] = new Array();
            for ( var j = 0; j < rows[i]; j++) {
                var obj = document.createElement('input');
                self.nim_objects[i][j] = obj;
                obj.setAttribute('type', 'checkbox');
                obj.className = 'checkbox'
                obj.row = i;
                obj.permanent = false;
                row.appendChild(obj);
                $(obj).bind("click", function() { self.clickHandle(this)})
            }
            board.appendChild(row);
        }
    }
    this.row_contains_checked_items = function(row) {
        return $("#row" + row + " input").is(":checked");
    }
    /* execute a function on each element of the row */
    this.row_map = function(row, func) {
    	self.nim_objects[row].forEach(function(el,index,array) {
            func(el);
        });
    }
    /*
	 * set all checkboxes of a row either disabled or enabled. Passing in true
	 * for the disabled parameter will disable the checkbox
	 */
    this.set_row = function(row, disabled) {
        this.row_map(row, function(element) {
            if (element.permanent) {
                element.disabled = true;
            } else {
                element.disabled = disabled;
            }
        });
    }

    this.clickHandle = function(el) {
        if (!el.checked) {
            start_turn_checked--;
            if (!self.row_contains_checked_items(el.row)) {
                set_all_rows(false);
            }
            update_button();
            return;
        }      
        start_turn_checked++;
        set_other_rows(el.row, true);
        update_button();
    }
    var set_other_rows = function(row, disabled) {
        for (var i =0; i< total_heaps; i++) {
            if (i != row) {
                this.set_row(i, disabled);
            }            
        }
    }
    var set_checkboxes_permanent = function() {
        for ( var i = 0; i < total_heaps; i++) {
            this.row_map(i, function(element) {
                if (element.checked) {
                    element.permanent = true;
                    element.disabled = true;
                }
            })
        }
    }
	
    var set_all_rows = function(disabled) {
        for ( var i = 0; i < total_heaps; i++) {
            set_row(i, disabled)
        }
    }
    var all_heaps_checked = function() {
    	return self.nim_objects.every(function(element, index, array) {
            return element.every(function(el,index,array) { return el.checked})
         });
    }
       
    var set_message = function(message)  {
        this.set_message(message);
    }
    this.append_message = function(message) {
        document.getElementById('message-box').innerHTML += message;
    }
    // Prints a message in the message div with id of 'message-box'
    this.set_message = function(message) {
   
    	document.getElementById('message-box').innerHTML = message;
    }
    /* start the game up */
    init();
}
