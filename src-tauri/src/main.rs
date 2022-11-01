#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::path::Path;

use serde::Serialize;
use tauri::api::file::read_string;
use walkdir::WalkDir;

//TODO: force UNIX separators

#[tauri::command]
fn read_files(path: String, extensions: Vec<String>, path_parts: Vec<String>) -> Vec<FileEntry> {
    let mut entries: Vec<FileEntry> = vec![];

    for entry in WalkDir::new(path) {
        if let Ok(entry) = entry {
            let path = entry.path();
            let is_file = entry.file_type().is_file();
            if is_file && is_relevant(path, &extensions, &path_parts) {
                let content = read_string(path);

                if let Ok(x) = content {
                    entries.push(FileEntry {
                        path: path.to_str().unwrap().to_string(),
                        content: x,
                    })
                }
            }
        }
    }
    return entries;
}

fn is_relevant(path: &Path, extensions: &Vec<String>, path_parts: &Vec<String>) -> bool {
    let path = path.to_str().unwrap();

    extensions
        .into_iter()
        .filter(|ext| path.ends_with(*ext))
        .count()
        > 0
        && path_parts
            .into_iter()
            .filter(|path_part| path.contains(*path_part))
            .count()
            > 0
}

#[derive(Debug, Serialize)]
struct FileEntry {
    path: String,
    content: String,
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
