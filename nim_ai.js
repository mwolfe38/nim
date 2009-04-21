var AI = function(Nim) {
    this.Nim = Nim;
    var self = this;
    var  nim_objects = Nim.get_nim_objects();
    this.get_open_rows = function() {
        var open_rows = new Array();
        for (var i= 0; i<nim_objects.length; i++) {
            for (var j=0; j<nim_objects[i].length; j++) {
                if (nim_objects[i][j].checked == false) {
                    open_rows.push(i);
                    break;
                }
            }
        }
        return open_rows;
    }
    this.get_number_openings_in_row = function(row) {        
        return nim_objects[row].reduce(function(prev,curr) {
            if(curr.checked == true) {
                return prev++;
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
                max_row = open_rows[i];
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
            newxor = openings ^ xor;            
            if (newxor < openings) {            
                this.check_boxes(open_rows[i], openings - newxor)
                return;
            }
        }
        this.check_most_open_row(open_rows);        
    }
    this.check_most_open_row = function(open_rows) {       
        var most_row = this.get_row_with_most_open(open_rows);
        this.check_boxes(most_row,1);
    }
    this.check_boxes = function(row, number) {        
        var count=0;
        //alert("checking row: " + row + " number: " + number);
        for (var i=0; i<nim_objects[row].length; i++) {
            if (nim_objects[row][i].checked == false) {
                nim_objects[row][i].checked = true;
                Nim.clickHandle(nim_objects[row][i]);
                count++;
                if (count >= number) {
                    break;
                }
            }
        }
        //alert('ending turn');
        //$('#end-turn-button').click();
        Nim.set_message("next player about to move");
        setTimeout("end_turn_button_handler()", 2000);
    }
}
