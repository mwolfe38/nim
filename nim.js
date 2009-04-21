function getRandom(min,max)
{
    return (Math.round(Math.random()*(max-min)))+min;
}
function Nim(player1, player2) {
    var board_id = 'nim-board';
    var board = document.getElementById(board_id);
    var player = 1;
    var start_turn_checked = 0;
    var end_turn_button = document.getElementById('end-turn-button');
    var total_heaps = getRandom(3,3);
    var nim_objects = new Array();
    var computerAI = null;
    this.get_nim_objects = function() {
        return nim_objects;
    }
    var init = function() {
        /* do some initial setup */
        var inputs = new Array();
        setup_board();
        end_turn_button.controller = this;
        end_turn_button.onclick = function() { 
            this.controller.end_turn_button_handler()
        }
        computerAI = new AI(this);
        this.set_message("Player " + player + " its your turn");
        player_go();
    }
    var display_winning_message = function(player) {
        var url = "#TB_inline?height=65&amp;width=300&amp;inlineId=winnerMessage&amp;modal=true"
        $('#winnerMessage').html('<div id="message-popup"><h1>Player ' + player + ' Wins!!</h1><br /><a onclick="tb_remove();location.reload(true)">Close</a></div>');
        tb_show(null, url, null);
    }
    var determine_next_player = function() {
        if (player == 1) {
            player = 2
            if (player2 == "computer") {
                computers_turn = true;
            }
        } else {
            player = 1
            if (player1 == "computer") {
                computers_turn = true;
            }
        }
         if (computers_turn) {
            computer_move();
        }
    }
    var player_go = function() {
        if ((player == 1 && player1 == "computer") || (player == 2 && player2 == "computer")) {
            computer_move();
        }
    }
    this.end_turn_button_handler = function() {
        //alert('end turn player ' + player)
        computers_turn = false;
        if (all_heaps_checked()) {
            display_winning_message(player)
            return;
        }        
        start_turn_checked = 0;
        set_checkboxes_permanent();
        set_message('Player ' + player + " its your turn");
        end_turn_button.disabled = true;
        set_all_rows(false);
        determine_next_player();
        player_go();
    }
    var computer_move = function() {
        //alert('computer moving');
        computerAI.move();
    }
    this.update_button = function() {
        end_turn_button.disabled = (start_turn_checked == 0);
        if (start_turn_checked < 0) { 
           // alert("Less than 0 checked in your turn. This shouldn't be possible")
            }
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
            nim_objects[i] = new Array();
            for ( var j = 0; j < rows[i]; j++) {
                var obj = document.createElement('input');
                nim_objects[i][j] = obj;
                obj.setAttribute('type', 'checkbox');
                obj.controller=this;
                obj.className = 'checkbox'
                obj.row = i;
                obj.permanent = false;
                row.appendChild(obj);
                $(obj).bind("click", function() { this.controller.clickHandle(this)})
                /*
                obj.onclick = function() {
                    clickHandle(this);
                };*/

            }
            board.appendChild(row);
        }
    }
    this.row_contains_checked_items = function(row) {
        return $("#row" + row + " input").is(":checked");
    }
    /* execute a function on each element of the row */
    this.row_map = function(row, func) {
        nim_objects[row].forEach(function(el,index,array) {
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
            if (!this.row_contains_checked_items(el.row)) {
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
        nim_objects.forEach(function(element, index, array) {
            element.every(function(el,index,array) { return el.checked})
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
    init();
}