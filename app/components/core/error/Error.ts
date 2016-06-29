
export class Error{

  constructor(private message: string){
  }

  getMessage(): string{
    return this.message;
  }

}



/*
errorMessageIn(){
  $(this.element.nativeElement).find('.label-error-message').css('opacity', '100');
}

errorMessageOut(){
  $(this.element.nativeElement).find('.label-error-message').css('opacity', '0');
}

.label-error-message {
  position: absolute;
  left: 0;
  top: 45px;
  height: 28px;
  border-radius: 20px;
  background-color: #ff6b46;
  color: white;
  text-align: center;
  padding-left: 10px;
  line-height: 28px;
  padding-right: 10px;
  transition: opacity 0.2s ease-out;
  width: inherit;
  margin-left:25%;
}
*/
