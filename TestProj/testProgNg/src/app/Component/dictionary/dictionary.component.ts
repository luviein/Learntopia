import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameServiceService } from 'src/app/Service/game-service.service';
import { DictionaryQuery } from 'src/app/game.model';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  constructor(private svc:GameServiceService, private fb: FormBuilder){}
  form!: FormGroup
  query!: any
  parsedQuery!: any
  queryList: DictionaryQuery[] = []

  ngOnInit(): void {
    this.form = this.fb.group({
      query: this.fb.control<string>( "" ,[Validators.required])
    })
  }

  async process() {
    this.query = this.form.value as DictionaryQuery

    const result = await this.svc.getDefinition(this.query.query)
    this.queryList = result.map((jsonString: any) => {
      return JSON.parse(JSON.stringify(jsonString)) as DictionaryQuery;

    })

  }
}
