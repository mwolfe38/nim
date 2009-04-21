var AI = function(Nim) {
    this.Nim = Nim;
    var self = this;
    this.nim_objects = Nim.nim_objects;
    this.get_open_rows = function() {
        var open_rows = new Array();
        for (var i= 0; i<self.nim_objects.length; i++) {
            for (var j=0; j<self.nim_objects[i].length; j++) {
                if (self.nim_objects[i][j].checked == false) {
                    open_rows.push(i);
                    break;
                }
            }
        }
        return open_rows;
    }
    this.get_number_openings_in_row = function(row) {        
        return self.nim_objects[row].reduce(function(prev,curr) {
            if(curr.checked == false) {
                prev++;
            }
            return prev;
        },0);
    }
    
    this.get_row_with_most_open = function(open_rows) {
        var max = 0;
        var max_row=0;
        open_rows.forEach(function(row) {
            var temp = self.get_number_openings_in_row(row)
            if (temp > max) {
                max = temp;
                max_row = row;
            }
        });
        return max_row;
    }
    this.compute_xor = function() {
        var open_rows = this.get_open_rows();
        return open_rows.reduce(function(xor,curr) {
            return (xor ^= self.get_number_openings_in_row(curr));
        }, 0);
    }
    this.move = function() {
        var xor = this.compute_xor();
        var open_rows = this.get_open_rows();
        for (var i=0; i< open_rows.length; i++) {
            var openings = self.get_number_openings_in_row(open_rows[i]);
            var newxor = openings ^ xor;            
            if (newxor < openings) {  
            	debug("Player " + Nim.player + " about to check a row, i should be the winner")
                this.check_boxes(open_rows[i], openings - newxor)
                return;
            }
        }
        this.check_most_open_row(open_rows);        
    }
    this.check_most_open_row = function(open_rows) { 
    	debug('Player ' + Nim.player + ' checking most open row')
        var most_row = this.get_row_with_most_open(open_rows);
        this.check_boxes(most_row,1);
    }
    this.check_boxes = function(row, number) {        
        var count=0;
        debug("player: " + Nim.player + " checking row: " + row + " number: " + number);
        for (var i=0; i<self.nim_objects[row].length; i++) {
            if (self.nim_objects[row][i].checked == false) {
            	self.nim_objects[row][i].checked = true;
                Nim.clickHandle(self.nim_objects[row][i]);
                count++;
                if (count >= number) {
                    break;
                }
            }
        }
        end_turn_button_handler();
        //setTimeout("end_turn_button_handler()", 100);
    }
}
