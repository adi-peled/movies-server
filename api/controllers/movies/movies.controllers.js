import { ResService } from "../../../services/resHandler.service.js";
import axios from 'axios'
import dotenv from 'dotenv'
import fs from 'fs'
import movies from '../../../data/movies.json' assert {type: "json"};
dotenv.config()
const base_url = 'https://www.omdbapi.com?type=movie'
const apikey = process.env.apikey
console.log({apikey});
export class MovieController {

    static async getDefault(req, res) {
        try {
            if (movies.length) {
                ResService.handleSuccess(res, movies)
            } else {
                const movies = await axios.get(`${base_url}&&s=ince&apikey=${apikey}`)
                if (movies?.data?.Search) {
                    fs.writeFile('data/movies.json', JSON.stringify(movies.data.Search), 'utf-8', (err) => {
                        console.log({ err });
                        if (err) {
                            console.log('err', err);
                        } else {
                            console.log('saved');
                        }
                        ResService.handleSuccess(res, movies.data.Search)
                    })
                }
            }
        } catch (err) {
            ResService.handleErr(res, err)
        }
    }

    static async searchByName(req, res) {
        try {
            const { title } = req.query
            console.log(title);
            const movies = await axios.get(`${base_url}&&s=${title}&apikey=${apikey}`)
            ResService.handleSuccess(res, movies.data)
        } catch (err) {
            ResService.handleErr(res, err)

        }
    }

    static async getFullInfo(req, res) {
        try {
            const { movieId } = req.params
            const movie = await axios.get(`${base_url}&&i=${movieId}&apikey=${apikey}`)
            ResService.handleSuccess(res, movie.data)
        } catch (err) {
            ResService.handleErr(res, err)
        }
    }
}
