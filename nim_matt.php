<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
    <head>
        <title>Nim - Matt's version</title>
         <script type="text/javascript" src="array_prototype.js"></script>
        <script type="text/javascript" src="jquery.js"></script>
        <script type="text/javascript" src="thickbox.js"></script>
        <script type="text/javascript" src="nim.js"></script>
         <script type="text/javascript" src="nim_ai.js"></script>
        <script type="text/javascript">                     
        	function choosePlayer() {
				var player1 = $("input:radio[name='player1']:checked").val();
				var player2 = $("input:radio[name='player2']:checked").val();
                if (player1 == null || player2 == null) {
                    return
                }           
				tb_remove();
    			Nim(player1, player2);
        	}
        	function clickChoosePlayerLink() {
        		$("#choose-player-link").click();
        	}
        	$(document).ready(function() {  
            	setTimeout("clickChoosePlayerLink()", 100);
        	 });
        </script>
        
        <style type="text/css">
        	@import 'thickbox.css';   
        	body,div {margin: 0px; padding: 0px;}
        	#wrapper { width: 800px; margin:0 auto; }
        	#content, .buttons, #message-popup {text-align:center; }
            #nim-board { display: table-cell; vertical-align:middle; height: 200px; border: 2px solid #000; width: 800px; margin: 0 auto;}
            #nim-board input { margin: 5px; }
            
            h1 {text-align:center}
           #choosePlayers { display: none;}
           fieldset { padding: 15px; }
           #message-box { padding:20px 10px; border: 2px solid #000; width:400px; height: 25px; text-align: center; margin: 0 auto;}
           #winnerMessage { text-align: center; padding: 20px;}
           .buttons input { padding: 3px; }
           #debug { 
           		font-family:monospace;
           		border: 1px dotted #000;
           		background-color:#ccc;
           		height:300px;
           		overflow:auto;
           }
           
        </style>
    </head>
    <body>
        <div id="wrapper">
            <div id="header">
                <h1>Nim</h1>
                <div id="nav"></div>
            </div>
            <div id="content">                
            <a href="#TB_inline?height=225&amp;width=300&amp;inlineId=choosePlayers&amp;modal=true" id="choose-player-link" class='thickbox'>Choose Players</a>
					<div id="nim-board"></div>
					<div id="choosePlayers">
						<h3>Choose Your Players</h3>						
						<fieldset>
							<legend>Player 1</legend>
                                <input type="radio" name="player1" id="player-1-computer" value="computer"/>
                                <label for="player-1-computer">Computer</label>
                                <br />							
								<input type="radio" name="player1" id="player-1-human" value="human" checked="checked"/>
                                <label for="player-1-human">Human</label>
						</fieldset>
						<fieldset>
							<legend>Player 2</legend>							
								<input type="radio" name="player2" id="player-2-computer" value="computer" checked="checked"/>
                                <label for="player-2-computer">Computer</label>
                                <br />							
								<input type="radio" name="player2" id="player-2-human" value="human"/>
                                <label for="player-2-human">Human</label>
						</fieldset>
                        <div class="buttons"><input type="button" name="ready" value="Ready" onclick="choosePlayer()" /></div>
					</div>					 
                    <div id="message-box"></div>                      
                    <div class="buttons"><input type="button" name="end_turn" value="End Turn" id="end-turn-button" />
                    <br />
                    <br />
                    <br />
                    <input type="button" onclick="location.reload(true)" value="reset game" /></div>
                </form>
            </div>
            <div id="winnerMessage"></div>
            
        </div>
        <div id="debug"></div>
        
    </body>

</html>
