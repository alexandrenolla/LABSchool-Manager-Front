import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { User, TipoGenero, TipoUsuario, TipoEstado } from '../../Model/user.model';
import { ViaCepService } from '../../../services/via-cep.service'; 

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {
  userForm: FormGroup;
  isLoading: boolean = false;

  genders = Object.values(TipoGenero).filter(value => typeof value === 'string');
  userTypes = Object.values(TipoUsuario).filter(value => typeof value === 'string');
  states = Object.values(TipoEstado).filter(value => typeof value === 'string');

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private viaCepService: ViaCepService
  ) {
    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      genero: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, CreateEditComponent.cepFormatValidator()]],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        referencia: ['']
      }),
      statusAtivo: [true, Validators.required],
      matricula: [null],
      codigoProfessor: [null],
      whiteLabelId: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userForm?.get('endereco.cep')?.valueChanges.subscribe(cep => {
      if (cep && /^[0-9]{5}-[0-9]{3}$/.test(cep)) {
        this.viaCepService.getEnderecoByCep(cep).subscribe(data => {
          if (data && !data.erro) {
            this.userForm?.get('endereco')?.get('logradouro')?.setValue(data.logradouro);
            this.userForm?.get('endereco')?.get('bairro')?.setValue(data.bairro);
            this.userForm?.get('endereco')?.get('cidade')?.setValue(data.localidade);
            this.userForm?.get('endereco')?.get('estado')?.setValue(data.uf);
          } else {
            alert('Cep não encontrado')
            console.error('CEP não encontrado');
            this.userForm?.get('endereco.cep')?.setErrors({'cepNotFound': true});
          }
        },
        error => {
          alert('Erro ao buscar CEP')
          console.error('Erro ao buscar CEP.', error);
          this.userForm?.get('endereco.cep')?.setErrors({'cepServiceError': true});
        });
      } else if (cep && cep.length >= 8) {
        
        this.userForm?.get('endereco.cep')?.setErrors({'invalidCep': true});
        
      }
    });
  }

  onSubmit(): void {
    if (this.userForm?.valid) {
      const user: User = this.userForm?.value;
      user.genero = this.stringToTipoGenero(user.genero as unknown as string);
      user.tipoUsuario = this.stringToTipoUsuario(user.tipoUsuario as unknown as string);
      user.endereco.estado = this.stringToTipoEstado(user.endereco.estado as unknown as string);
      
      if (user.id) {
        this.usuarioService.updateUser(user.id, user).subscribe(
          response => {
            console.log('Usuário atualizado com sucesso!', response);
            
          },
          error => {
            console.error('Erro ao atualizar o usuário.', error);
          }
          
        );
      } else {
        this.usuarioService.createUser(user).subscribe(
          response => {
            alert('Usuário criado com sucesso!')
            console.log('Usuário criado com sucesso!', response);

            this.userForm.reset();
            Object.keys(this.userForm.controls).forEach((key) => {
              this.userForm.get(key)?.setErrors(null);
            });
          },
          
          error => {
            alert('Erro ao criar o usuário.')
            console.error('Erro ao criar o usuário.', error);
            
          }
        );
      }
    } else {
      
      console.error('Formulário inválido. Verifique os dados inseridos.');
    }
    
  }

  

  stringToTipoGenero(value: string): TipoGenero {
    switch (value) {
      case "Masculino":
          return TipoGenero.Masculino;
      case "Feminino":
          return TipoGenero.Feminino;
      default:
          throw new Error('Genero inválido: ' + value);
    }
  }

  stringToTipoUsuario(value: string): TipoUsuario {
    switch (value) {
      case "Administrador":
          return TipoUsuario.Administrador;
      case "Pedagogo":
          return TipoUsuario.Pedagogo;
      case "Professor":
          return TipoUsuario.Professor;
      case "Aluno":
          return TipoUsuario.Aluno;
      default:
          throw new Error('Tipo de usuário inválido: ' + value);
    }
  }

  stringToTipoEstado(value: string): TipoEstado {
    switch (value) {
      case "AC": return TipoEstado.AC;
      case "AL": return TipoEstado.AL;
      case "AP": return TipoEstado.AP;
      case "AM": return TipoEstado.AM;
      case "BA": return TipoEstado.BA;
      case "CE": return TipoEstado.CE;
      case "DF": return TipoEstado.DF;
      case "ES": return TipoEstado.ES;
      case "GO": return TipoEstado.GO;
      case "MA": return TipoEstado.MA;
      case "MT": return TipoEstado.MT;
      case "MS": return TipoEstado.MS;
      case "MG": return TipoEstado.MG;
      case "PA": return TipoEstado.PA;
      case "PB": return TipoEstado.PB;
      case "PR": return TipoEstado.PR;
      case "PE": return TipoEstado.PE;
      case "PI": return TipoEstado.PI;
      case "RJ": return TipoEstado.RJ;
      case "RN": return TipoEstado.RN;
      case "RS": return TipoEstado.RS;
      case "RO": return TipoEstado.RO;
      case "RR": return TipoEstado.RR;
      case "SC": return TipoEstado.SC;
      case "SP": return TipoEstado.SP;
      case "SE": return TipoEstado.SE;
      case "TO": return TipoEstado.TO;
      default:
          throw new Error('Estado inválido: ' + value);
    }
  }

  static cepFormatValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isValid = /^[0-9]{5}-[0-9]{3}$/.test(control.value);
      return !isValid ? {'invalidCep': {value: control.value}} : null;
    };
  }
  validateErrorMessage(field: string) {
    return this.userForm.get(field)?.invalid && this.userForm.get(field)?.touched;
  }
  isFieldInvalid(field: string): boolean {
    const formControl = this.userForm.get(field);
    return formControl ? formControl.invalid && (formControl.dirty || formControl.touched) : false;
  }

  // Implementação da função para verificar se um campo está válido
  isFieldValid(field: string): boolean {
    const formControl = this.userForm.get(field);
    return formControl ? formControl.valid && (formControl.dirty || formControl.touched) : false;
  }
}