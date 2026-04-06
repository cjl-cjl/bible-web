cd ../verses-api
cargo run --release &

cd ../users-api
go run . &

cd ../bible-web
bun run dev
